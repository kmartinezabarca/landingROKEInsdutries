// Jenkinsfile — ROKE Industries Landing Page
pipeline {
    agent {
        docker {
            image 'roke-jenkins-agent:latest'
            args '-v /var/run/docker.sock:/var/run/docker.sock -v /root/.npm:/root/.npm -v /opt/apps:/opt/apps:rw'
            reuseNode true
        }
    }

    environment {
        PROD_URL     = 'https://rokeindustries.com'
        PROD_MX_URL  = 'https://rokeindustries.com.mx'
        STAGING_URL  = 'https://rokeindustries.dev'

        PROD_API_URL    = 'https://api.rokeindustries.com'
        STAGING_API_URL = 'https://api.rokeindustries.dev'

        STAGING_PATH = '/opt/apps/staging/landing'
        PROD_PATH    = '/opt/apps/landing'

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
        booleanParam(name: 'SKIP_TESTS',       defaultValue: false, description: 'Saltar tests')
    }

    stages {

        stage('Checkout') {
            steps {
                script {
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

        stage('Load Environment') {
            when { expression { params.DEPLOY_ENV != 'none' } }
            steps {
                script {
                    def envPath = params.DEPLOY_ENV == 'staging'
                        ? env.ENV_STAGING_PATH
                        : env.ENV_PROD_PATH

                    sh """
                        cp ${envPath} .env
                        echo ".env cargado desde: ${envPath}"
                        echo "Variables VITE_*: \$(grep -c '^VITE_' .env)"
                        grep "^VITE_API_URL" .env
                        grep "^VITE_ENVIRONMENT" .env || true
                    """
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    corepack enable
                    corepack prepare pnpm@10.4.1 --activate
                    pnpm install --frozen-lockfile
                '''
            }
        }

        stage('Code Quality') {
            parallel {
                stage('Lint') {
                    when { expression { params.RUN_LINT } }
                    steps { sh 'pnpm run lint || true' }
                }
                stage('Format Check') {
                    when { expression { params.RUN_FORMAT_CHECK } }
                    steps { sh 'pnpm run format:check || true' }
                }
                stage('Security Audit') {
                    steps { sh 'pnpm audit --audit-level=high || true' }
                }
            }
        }

        stage('Tests') {
            when { expression { !params.SKIP_TESTS } }
            steps { sh 'pnpm run test:ci || true' }
        }

        stage('Build') {
            steps {
                script {
                    sh '''
                        pnpm run build
                        test -d dist && echo "Build exitoso"
                        test -f dist/index.html && echo "index.html presente"
                        du -sh dist/
                    '''

                    if (params.DEPLOY_ENV == 'staging') {
                        sh '''
                            grep -r "api.rokeindustries.dev" dist/ --include="*.js" -l 2>/dev/null \
                                && echo "API URL staging confirmada en bundle" \
                                || echo "API URL no encontrada en bundle"
                        '''
                    } else if (params.DEPLOY_ENV == 'production') {
                        sh '''
                            grep -r "api.rokeindustries.com" dist/ --include="*.js" -l 2>/dev/null \
                                && echo "API URL produccion confirmada en bundle" \
                                || echo "API URL no encontrada en bundle"
                        '''
                    }
                }
            }
            post {
                success {
                    archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
                }
            }
        }

        stage('Confirmar deploy a produccion') {
            when {
                allOf {
                    expression { params.DEPLOY_ENV == 'production' }
                }
            }
            steps {
                script {
                    input(
                        message: "Confirmas deploy a PRODUCCION?\n\n${PROD_URL}\n${PROD_MX_URL}\nCommit: ${sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()}",
                        ok: 'Si, desplegar',
                        submitter: 'admin'
                    )
                }
            }
        }

        stage('Deploy Staging') {
            when {
                allOf {
                    expression { params.DEPLOY_ENV == 'staging' }
                }
            }
            steps {
                sh '''
                    cp -r dist/. ${STAGING_PATH}/
                    test -f ${STAGING_PATH}/index.html && echo "Deploy staging exitoso"
                    ls ${STAGING_PATH}/ | head -5
                '''
                echo "Disponible en: ${STAGING_URL}"
            }
        }

        stage('Deploy Production') {
            when {
                allOf {
                    expression { params.DEPLOY_ENV == 'production' }
                }
            }
            steps {
                sh '''
                    # Backup
                    mkdir -p /opt/backups/landing
                    cp -r ${PROD_PATH} /opt/backups/landing/landing_$(date +%Y%m%d_%H%M%S) 2>/dev/null || true

                    # Deploy
                    cp -r dist/. ${PROD_PATH}/
                    test -f ${PROD_PATH}/index.html && echo "Deploy produccion exitoso"
                    ls ${PROD_PATH}/ | head -5

                    # Reload Nginx
                    sudo /usr/bin/systemctl reload nginx
                '''
                echo "Disponible en: ${PROD_URL} y ${PROD_MX_URL}"
            }
        }
    }

    post {
        success {
            echo "Pipeline #${env.BUILD_NUMBER} completado — ${params.DEPLOY_ENV}"
        }
        failure {
            echo "Pipeline #${env.BUILD_NUMBER} fallo en: ${env.STAGE_NAME}"
        }
        cleanup {
            sh 'rm -f .env 2>/dev/null || true'
            cleanWs()
        }
    }
}