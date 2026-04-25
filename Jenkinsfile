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
        PROD_SERVER   = '100.124.151.68'
        PROD_SSH_USER = 'rokecore'

        // ── Paths en el servidor ──────────────────────────────
        PROD_PATH     = '/var/www/roke/landing'
        STAGING_PATH  = '/var/www/roke/staging/landing'

        // ── Docker ────────────────────────────────────────────
        DOCKER_IMAGE  = 'roke-landing'
        
        // ── Credenciales (configurar en Jenkins Credentials) ──
        SSH_KEY = credentials('roke-ssh-key')
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
        booleanParam(
            name: 'RUN_LINT',
            defaultValue: true,
            description: 'Ejecutar ESLint'
        )
        booleanParam(
            name: 'RUN_FORMAT_CHECK',
            defaultValue: true,
            description: 'Verificar formato con Prettier'
        )
        booleanParam(
            name: 'SKIP_TESTS',
            defaultValue: false,
            description: 'Saltar tests (no recomendado en producción)'
        )
    }

    stages {

        // ── STAGE 1: Checkout ─────────────────────────────────
        stage('Checkout') {
            steps {
                script {
                    echo "📦 Obteniendo código fuente..."
                    checkout scm
                    
                    // Mostrar información del commit
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
                script {
                    echo "📥 Instalando dependencias con pnpm..."
                    sh '''
                        corepack enable
                        corepack prepare pnpm@10.4.1 --activate
                        pnpm install --frozen-lockfile
                    '''
                }
            }
        }

        // ── STAGE 3: Calidad de código (paralelo) ─────────────
        stage('Code Quality') {
            parallel {
                stage('Lint') {
                    when {
                        expression { params.RUN_LINT }
                    }
                    steps {
                        echo "🔍 Ejecutando ESLint..."
                        sh 'pnpm run lint || true'
                    }
                }

                stage('Format Check') {
                    when {
                        expression { params.RUN_FORMAT_CHECK }
                    }
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
            when {
                expression { !params.SKIP_TESTS }
            }
            steps {
                echo "🧪 Ejecutando tests..."
                sh 'pnpm run test:ci || true'
            }
        }

        // ── STAGE 5: Build ────────────────────────────────────
        stage('Build') {
            parallel {

                stage('Build Staging') {
                    when {
                        expression { params.DEPLOY_ENV == 'staging' }
                    }
                    steps {
                        script {
                            echo "🏗️ Build para STAGING: ${STAGING_URL}"
                            sh """
                                VITE_API_URL=${STAGING_API_URL} \
                                VITE_APP_ENV=staging \
                                VITE_APP_TITLE='Roke Industries [DEV]' \
                                pnpm run build
                            """
                            sh 'test -d dist && echo "✅ Build staging exitosa"'
                        }
                    }
                }

                stage('Build Production') {
                    when {
                        expression { params.DEPLOY_ENV == 'production' || params.DEPLOY_ENV == 'none' }
                    }
                    steps {
                        script {
                            echo "🏗️ Build para PRODUCCIÓN: ${PROD_URL}"
                            sh """
                                VITE_API_URL=${PROD_API_URL} \
                                VITE_APP_ENV=production \
                                VITE_APP_TITLE='Roke Industries' \
                                pnpm run build
                            """
                            sh 'test -d dist && echo "✅ Build producción exitosa"'
                        }
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
            when {
                expression { params.DEPLOY_ENV == 'staging' }
            }
            steps {
                script {
                    echo "🚀 Desplegando a STAGING: ${STAGING_URL}"

                    sh """
                        # Copiar build al servidor via SSH (Tailscale)
                        rsync -avz --delete \
                            -e "ssh -i ${SSH_KEY} -o StrictHostKeyChecking=no" \
                            dist/ \
                            ${PROD_SSH_USER}@${PROD_SERVER}:${STAGING_PATH}/

                        # Ajustar permisos
                        ssh -i ${SSH_KEY} -o StrictHostKeyChecking=no \
                            ${PROD_SSH_USER}@${PROD_SERVER} \
                            "sudo chown -R www-data:www-data ${STAGING_PATH} && \
                             sudo chmod -R 755 ${STAGING_PATH}"
                    """

                    echo "✅ Staging disponible en: ${STAGING_URL}"
                }
            }
        }

        // ── STAGE 8: Deploy Producción ────────────────────────
        stage('Deploy Production') {
            when {
                expression { params.DEPLOY_ENV == 'production' }
            }
            steps {
                script {
                    echo "⚠️  Desplegando a PRODUCCIÓN"

                    // Confirmación manual obligatoria
                    input(
                        message: "¿Confirmas el deploy a producción?\n${PROD_URL}\n${PROD_MX_URL}",
                        ok: '🚀 Sí, desplegar'
                    )

                    echo "🚀 Desplegando a: ${PROD_URL} y ${PROD_MX_URL}"

                    sh """
                        # Backup del deploy anterior
                        ssh -i ${SSH_KEY} -o StrictHostKeyChecking=no \
                            ${PROD_SSH_USER}@${PROD_SERVER} \
                            "cp -r ${PROD_PATH} ${PROD_PATH}_backup_\$(date +%Y%m%d_%H%M%S) 2>/dev/null || true"

                        # Deploy via rsync (Tailscale garantiza la conexión)
                        rsync -avz --delete \
                            -e "ssh -i ${SSH_KEY} -o StrictHostKeyChecking=no" \
                            dist/ \
                            ${PROD_SSH_USER}@${PROD_SERVER}:${PROD_PATH}/

                        # Ajustar permisos y recargar Nginx
                        ssh -i ${SSH_KEY} -o StrictHostKeyChecking=no \
                            ${PROD_SSH_USER}@${PROD_SERVER} \
                            "sudo chown -R www-data:www-data ${PROD_PATH} && \
                             sudo chmod -R 755 ${PROD_PATH} && \
                             sudo systemctl reload nginx"
                    """

                    echo "✅ Producción actualizada: ${PROD_URL}"
                    echo "✅ Espejo México actualizado: ${PROD_MX_URL}"
                }
            }
        }
    }

    // ── POST: Notificaciones y limpieza ───────────────────────
    post {
        success {
            script {
                def envName = params.DEPLOY_ENV == 'none' ? 'build' : params.DEPLOY_ENV
                def url = params.DEPLOY_ENV == 'staging' ? env.STAGING_URL : env.PROD_URL

                echo "✅ Pipeline #${env.BUILD_NUMBER} completado — ${envName}"

                // Activar cuando tengas Slack configurado
                // slackSend(
                //     channel: '#deployments',
                //     color: 'good',
                //     message: "✅ *Roke Landing* — Build #${env.BUILD_NUMBER} (${envName})\n${url}"
                // )
            }
        }

        failure {
            script {
                echo "❌ Pipeline #${env.BUILD_NUMBER} falló en: ${env.STAGE_NAME}"

                // slackSend(
                //     channel: '#deployments',
                //     color: 'danger',
                //     message: "❌ *Roke Landing* — Build #${env.BUILD_NUMBER} falló en *${env.STAGE_NAME}*"
                // )
            }
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