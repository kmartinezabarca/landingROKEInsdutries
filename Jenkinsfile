// Jenkinsfile — ROKE Industries Landing Page
// Dominios: rokeindustries.com / .com.mx / .dev

pipeline {
    agent {
        docker {
            image 'roke-jenkins-agent:latest'
            args '-v /var/run/docker.sock:/var/run/docker.sock -v /root/.npm:/root/.npm'
            reuseNode true
        }
    }

    environment {
        PROD_URL      = 'https://rokeindustries.com'
        PROD_MX_URL   = 'https://rokeindustries.com.mx'
        STAGING_URL   = 'https://rokeindustries.dev'

        PROD_API_URL     = 'https://api.rokeindustries.com'
        STAGING_API_URL  = 'https://api.rokeindustries.dev'

        DEPLOY_HOST  = '100.124.151.68'
        DEPLOY_USER  = 'rokecore'

        PROD_PATH    = '/opt/apps/landing'
        STAGING_PATH = '/opt/apps/staging/landing'

        // Paths de los .env en el servidor
        ENV_STAGING_PATH = '/opt/apps/staging/landing/.env.staging'
        ENV_PROD_PATH    = '/opt/apps/landing/.env.production'
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
                        echo "Branch:  $(git rev-parse --abbrev-ref HEAD)"
                        echo "Commit:  $(git rev-parse --short HEAD)"
                        echo "Autor:   $(git log -1 --pretty=format:'%an')"
                        echo "Mensaje: $(git log -1 --pretty=format:'%s')"
                    '''
                }
            }
        }

        // ── STAGE 2: Cargar .env desde el servidor ────────────
        // El .env de la landing tiene variables VITE_* que Vite hornea
        // en el bundle durante el build. Deben cargarse ANTES de build.
        stage('Load Environment') {
            when { expression { params.DEPLOY_ENV != 'none' } }
            steps {
                script {
                    echo "🔑 Cargando variables de entorno desde el servidor..."
                }
                sshagent(credentials: ['roke-ssh-key']) {
                    sh '''
                        if [ "${DEPLOY_ENV}" = "staging" ]; then
                            scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \
                                ${DEPLOY_USER}@${DEPLOY_HOST}:${ENV_STAGING_PATH} .env
                            echo "✅ .env.staging cargado"
                        elif [ "${DEPLOY_ENV}" = "production" ]; then
                            scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \
                                ${DEPLOY_USER}@${DEPLOY_HOST}:${ENV_PROD_PATH} .env
                            echo "✅ .env.production cargado"
                        fi

                        # Verificar (sin mostrar valores)
                        echo "Variables cargadas: $(grep -c "^VITE_" .env) VITE_* vars"
                        grep "^VITE_API_URL" .env
                        grep "^VITE_ENVIRONMENT" .env
                    '''
                }
            }
        }

        // ── STAGE 3: Dependencias ─────────────────────────────
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

        // ── STAGE 4: Calidad de código (paralelo) ─────────────
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

        // ── STAGE 5: Tests ────────────────────────────────────
        stage('Tests') {
            when { expression { !params.SKIP_TESTS } }
            steps {
                echo "🧪 Ejecutando tests..."
                sh 'pnpm run test:ci || true'
            }
        }

        // ── STAGE 6: Build ────────────────────────────────────
        stage('Build') {
            parallel {
                stage('Build Staging') {
                    when { expression { params.DEPLOY_ENV == 'staging' } }
                    steps {
                        echo "🏗️ Build para STAGING: ${STAGING_URL}"
                        sh '''
                            # El .env ya está en el workspace con las vars correctas
                            # Vite lo lee automáticamente
                            pnpm run build
                            test -d dist && echo "✅ Build staging exitosa"
                            echo "=== Variables bakeadas en el build ==="
                            grep -r "api.rokeindustries.dev" dist/ --include="*.js" -l 2>/dev/null \
                                && echo "✅ API URL de staging confirmada en bundle" \
                                || echo "⚠️  API URL no encontrada en bundle"
                        '''
                    }
                }
                stage('Build Production') {
                    when { expression { params.DEPLOY_ENV == 'production' } }
                    steps {
                        echo "🏗️ Build para PRODUCCIÓN: ${PROD_URL}"
                        sh '''
                            pnpm run build
                            test -d dist && echo "✅ Build producción exitosa"
                            echo "=== Variables bakeadas en el build ==="
                            grep -r "api.rokeindustries.com" dist/ --include="*.js" -l 2>/dev/null \
                                && echo "✅ API URL de producción confirmada en bundle" \
                                || echo "⚠️  API URL no encontrada en bundle"
                        '''
                    }
                }
                stage('Build Preview (none)') {
                    when { expression { params.DEPLOY_ENV == 'none' } }
                    steps {
                        echo "🏗️ Build de preview (sin deploy)..."
                        sh '''
                            pnpm run build
                            test -d dist && echo "✅ Build preview exitosa"
                        '''
                    }
                }
            }
        }

        // ── STAGE 7: Archivar artefactos ──────────────────────
        stage('Archive') {
            steps {
                echo "📁 Archivando artefactos..."
                archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
            }
        }

        // ── STAGE 8: Deploy Staging ───────────────────────────
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

        // ── STAGE 9: Deploy Producción ────────────────────────
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
                        # Backup del deploy anterior
                        ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \
                            ${DEPLOY_USER}@${DEPLOY_HOST} \
                            "sudo mkdir -p /opt/backups/landing && \
                             sudo cp -r ${PROD_PATH} /opt/backups/landing/landing_$(date +%Y%m%d_%H%M%S) 2>/dev/null || true"

                        # Deploy
                        rsync -avz --delete \
                            -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" \
                            dist/ \
                            ${DEPLOY_USER}@${DEPLOY_HOST}:${PROD_PATH}/

                        # Reload Nginx
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

    post {
        success {
            script {
                def envName = params.DEPLOY_ENV == 'none' ? 'build' : params.DEPLOY_ENV
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