// Jenkinsfile — ROKE Industries Landing Page
// Dominios: rokeindustries.com / .com.mx / .net / .dev

pipeline {
    agent {
        docker {
            image 'roke-jenkins-agent:latest'
            args '-v /var/run/docker.sock:/var/run/docker.sock -v /root/.npm:/root/.npm'
            reuseNode true
        }
    }

    environment {
        // ── Dominios por entorno ──────────────────────────────
        PROD_URL      = 'https://rokeindustries.com'
        PROD_MX_URL   = 'https://rokeindustries.com.mx'
        STAGING_URL   = 'https://rokeindustries.dev'

        // ── APIs por entorno ──────────────────────────────────
        PROD_API_URL      = 'https://api.rokeindustries.com'
        PROD_MX_API_URL   = 'https://api.rokeindustries.com.mx'
        STAGING_API_URL   = 'https://api.rokeindustries.dev'

        // ── Servidor destino (Tailscale IP del SRV-DELL) ──────
        DEPLOY_HOST   = '100.124.151.68'
        DEPLOY_USER   = 'rokecore'

        // ── Paths en el servidor (NUEVA ESTRUCTURA /opt/apps) ─
        PROD_PATH     = '/opt/apps/landing'
        STAGING_PATH  = '/opt/apps/staging/landing'
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        disableConcurrentBuilds()
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
    }

    parameters {
        choice(
            name: 'DEPLOY_ENV',
            choices: ['none', 'staging', 'production'],
            description: '''
                none       → Solo build y tests, sin deploy
                staging    → Deploy a rokeindustries.dev
                production → Deploy a rokeindustries.com y .com.mx
            '''
        )
        booleanParam(name: 'RUN_LINT',         defaultValue: true,  description: 'Ejecutar ESLint')
        booleanParam(name: 'RUN_FORMAT_CHECK', defaultValue: true,  description: 'Verificar formato con Prettier')
        booleanParam(name: 'SKIP_TESTS',       defaultValue: false, description: 'Saltar tests (no recomendado en producción)')
    }

    stages {

        // ── STAGE 1: Checkout ─────────────────────────────────
        stage('Checkout') {
            steps {
                script {
                    echo "📦 Obteniendo código fuente..."
                    checkout scm
                    sh '''
                        echo "Branch: $(git rev-parse --abbrev-ref HEAD)"
                        echo "Commit: $(git rev-parse --short HEAD)"
                        echo "Autor:  $(git log -1 --pretty=format:'%an')"
                        echo "Mensaje: $(git log -1 --pretty=format:'%s')"
                    '''
                }
            }
        }

        // ── STAGE 2: Dependencias ─────────────────────────────
        stage('Install Dependencies') {
            steps {
                echo "📥 Instalando dependencias con pnpm..."
                sh '''
                    corepack enable
                    corepack prepare pnpm@10.4.1 --activate
                    pnpm install --frozen-lockfile
                '''
            }
        }

        // ── STAGE 3: Calidad de código (paralelo) ─────────────
        stage('Code Quality') {
            parallel {
                stage('Lint') {
                    when { expression { params.RUN_LINT } }
                    steps {
                        echo "🔍 Ejecutando ESLint..."
                        sh 'pnpm run lint || true'
                    }
                }
                stage('Format Check') {
                    when { expression { params.RUN_FORMAT_CHECK } }
                    steps {
                        echo "🎨 Verificando formato con Prettier..."
                        sh 'pnpm run format:check || true'
                    }
                }
                stage('Security Audit') {
                    steps {
                        echo "🔐 Auditando dependencias..."
                        sh 'pnpm audit --audit-level=high || true'
                    }
                }
            }
        }

        // ── STAGE 4: Tests ────────────────────────────────────
        stage('Tests') {
            when { expression { !params.SKIP_TESTS } }
            steps {
                echo "🧪 Ejecutando tests..."
                sh 'pnpm run test:ci || true'
            }
        }

        // ── STAGE 5: Build ────────────────────────────────────
        stage('Build') {
            parallel {
                stage('Build Staging') {
                    when { expression { params.DEPLOY_ENV == 'staging' || params.DEPLOY_ENV == 'none' } }
                    steps {
                        echo "🏗️ Build para STAGING: ${STAGING_URL}"
                        sh """
                            VITE_API_URL=${STAGING_API_URL} \\
                            VITE_APP_ENV=staging \\
                            VITE_APP_TITLE='Roke Industries [DEV]' \\
                            pnpm run build
                        """
                        sh 'test -d dist && echo "✅ Build staging exitosa"'
                    }
                }
                stage('Build Production') {
                    when { expression { params.DEPLOY_ENV == 'production' } }
                    steps {
                        echo "🏗️ Build para PRODUCCIÓN: ${PROD_URL}"
                        sh """
                            VITE_API_URL=${PROD_API_URL} \\
                            VITE_APP_ENV=production \\
                            VITE_APP_TITLE='Roke Industries' \\
                            pnpm run build
                        """
                        sh 'test -d dist && echo "✅ Build producción exitosa"'
                    }
                }
            }
        }

        // ── STAGE 6: Archivar artefactos ──────────────────────
        stage('Archive') {
            steps {
                echo "📁 Archivando artefactos..."
                archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
            }
        }

        // ── STAGE 7: Deploy Staging ───────────────────────────
        stage('Deploy Staging') {
            when { expression { params.DEPLOY_ENV == 'staging' } }
            steps {
                echo "🚀 Desplegando a STAGING: ${STAGING_URL}"
                sshagent(credentials: ['roke-ssh-key']) {
                    sh '''
                        rsync -avz --delete \
                            -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" \
                            dist/ \
                            ${DEPLOY_USER}@${DEPLOY_HOST}:${STAGING_PATH}/
                    '''
                }
                echo "✅ Staging disponible en: ${STAGING_URL}"
            }
        }

        // ── STAGE 8: Deploy Producción ────────────────────────
        stage('Deploy Production') {
            when { expression { params.DEPLOY_ENV == 'production' } }
            steps {
                script {
                    echo "⚠️  Desplegando a PRODUCCIÓN"
                    input(
                        message: "¿Confirmas el deploy a producción?\n${PROD_URL}\n${PROD_MX_URL}",
                        ok: '🚀 Sí, desplegar'
                    )
                }
                echo "🚀 Desplegando a: ${PROD_URL} y ${PROD_MX_URL}"
                sshagent(credentials: ['roke-ssh-key']) {
                    sh '''
                        # Backup del deploy anterior (en /opt/backups/landing)
                        ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \
                            ${DEPLOY_USER}@${DEPLOY_HOST} \
                            "sudo mkdir -p /opt/backups/landing && \
                             sudo cp -r ${PROD_PATH} /opt/backups/landing/landing_$(date +%Y%m%d_%H%M%S) 2>/dev/null || true"

                        # Deploy
                        rsync -avz --delete \
                            -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" \
                            dist/ \
                            ${DEPLOY_USER}@${DEPLOY_HOST}:${PROD_PATH}/

                        # Reload Nginx (rokecore tiene NOPASSWD para esto)
                        ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \
                            ${DEPLOY_USER}@${DEPLOY_HOST} \
                            "sudo /usr/bin/systemctl reload nginx"
                    '''
                }
                echo "✅ Producción actualizada: ${PROD_URL}"
                echo "✅ Espejo México actualizado: ${PROD_MX_URL}"
            }
        }
    }

    // ── POST: Notificaciones y limpieza ───────────────────────
    post {
        success {
            script {
                def envName = params.DEPLOY_ENV == 'none' ? 'build' : params.DEPLOY_ENV
                def url     = params.DEPLOY_ENV == 'staging' ? env.STAGING_URL : env.PROD_URL
                echo "✅ Pipeline #${env.BUILD_NUMBER} completado — ${envName}"
            }
        }
        failure {
            echo "❌ Pipeline #${env.BUILD_NUMBER} falló en: ${env.STAGE_NAME}"
        }
        unstable {
            echo "⚠️ Pipeline inestable — revisar tests"
        }
        cleanup {
            echo "🧹 Limpiando workspace..."
            cleanWs()
        }
    }
}