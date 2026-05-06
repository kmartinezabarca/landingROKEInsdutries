// ==========================
// 🔔 DISCORD NOTIFY FUNCTION
// ==========================
def notify(status, extra="") {
    def colorMap = [
        "START": 3447003,
        "SUCCESS": 3066993,
        "FAILURE": 15158332,
        "WARNING": 15844367,
        "CRITICAL": 10038562
    ]

    def color = colorMap[status] ?: 3447003
    def url = params.DEPLOY_ENV == 'production' ? env.PROD_URL : env.STAGING_URL

    def isProd = params.DEPLOY_ENV == 'production'
    def mention = (status in ["FAILURE","CRITICAL"] && isProd) ? "<@&TU_ROLE_ID>" : ""

    def payload = """
    {
      "content": "${mention}",
      "embeds": [{
        "title": "🚀 Deploy ${status}",
        "color": ${color},
        "fields": [
          {"name":"Proyecto","value":"${env.JOB_NAME}","inline":true},
          {"name":"Build","value":"#${env.BUILD_NUMBER}","inline":true},
          {"name":"Env","value":"${params.DEPLOY_ENV}","inline":true},
          {"name":"Branch","value":"${env.GIT_BRANCH ?: 'N/A'}","inline":true},
          {"name":"Commit","value":"${env.GIT_COMMIT?.take(7) ?: 'N/A'}","inline":true},
          {"name":"Autor","value":"${env.GIT_AUTHOR_NAME ?: 'N/A'}","inline":true},
          {"name":"Duración","value":"${currentBuild.durationString ?: 'running'}","inline":true},
          {"name":"Size","value":"${env.BUILD_SIZE ?: 'N/A'}","inline":true},
          {"name":"URL","value":"${url}","inline":true},
          {"name":"Build URL","value":"${env.BUILD_URL}","inline":false},
          {"name":"Extra","value":"${extra}","inline":false}
        ]
      }]
    }
    """

    sh """
      curl -s -H 'Content-Type: application/json' \
           -X POST \
           -d '${payload}' \
           ${env.DISCORD_WEBHOOK}
    """
}

// ==========================
// 🚀 PIPELINE
// ==========================
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

        STAGING_PATH = '/opt/apps/staging/landing'
        PROD_PATH    = '/opt/apps/landing'

        ENV_STAGING_PATH = '/opt/apps/staging/landing/.env.staging'
        ENV_PROD_PATH    = '/opt/apps/landing/.env.production'

        DISCORD_WEBHOOK = 'https://discord.com/api/webhooks/1501364059117715558/W_w1xbGHR_jifhNtdE9koiPjoaiXB2fYEJ62mAsMn9zSeOnQxLXasOWpPN9a-Is35Wsd'
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        disableConcurrentBuilds()
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
    }

    parameters {
        choice(name: 'DEPLOY_ENV', choices: ['none', 'staging', 'production'])
        booleanParam(name: 'RUN_LINT', defaultValue: true)
        booleanParam(name: 'RUN_FORMAT_CHECK', defaultValue: false)
        booleanParam(name: 'SKIP_TESTS', defaultValue: true)
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
                script {
                    env.GIT_BRANCH = sh(script:"git rev-parse --abbrev-ref HEAD", returnStdout:true).trim()
                    env.GIT_COMMIT = sh(script:"git rev-parse HEAD", returnStdout:true).trim()
                    env.GIT_AUTHOR_NAME = sh(script:"git log -1 --pretty=format:'%an'", returnStdout:true).trim()
                }
                sh '''
                    echo "Branch:  $(git rev-parse --abbrev-ref HEAD)"
                    echo "Commit:  $(git rev-parse --short HEAD)"
                    echo "Autor:   $(git log -1 --pretty=format:'%an')"
                '''
            }
        }

        stage('Notify START') {
            steps { script { notify("START") } }
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
                    steps { sh 'pnpm lint || true' }
                }
                stage('Format Check') {
                    when { expression { params.RUN_FORMAT_CHECK } }
                    steps { sh 'pnpm run format:check || true' }
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    def buildCmd = params.DEPLOY_ENV == 'staging' ? 'pnpm run build:staging' : 'pnpm run build'

                    sh """
                        ${buildCmd}
                        test -d dist
                        test -f dist/index.html
                    """

                    env.BUILD_SIZE = sh(script:"du -sh dist | cut -f1", returnStdout:true).trim()
                }
            }
            post {
                success {
                    archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
                }
            }
        }

        stage('Confirmar deploy a produccion') {
            when { expression { params.DEPLOY_ENV == 'production' } }
            steps {
                input(
                    message: "Confirmas deploy a PRODUCCION?\n\n${PROD_URL}\n${PROD_MX_URL}",
                    ok: 'Si, desplegar',
                    submitter: 'admin'
                )
            }
        }

        stage('Deploy Staging') {
            when { expression { params.DEPLOY_ENV == 'staging' } }
            steps {
                sh '''
                    rm -rf ${STAGING_PATH}/assets
                    cp -rf dist/. ${STAGING_PATH}/
                    test -f ${STAGING_PATH}/index.html
                '''
                echo "Disponible en: ${STAGING_URL}"
            }
        }

        stage('Deploy Production') {
            when { expression { params.DEPLOY_ENV == 'production' } }
            steps {
                sh '''
                    mkdir -p /opt/backups/landing
                    cp -r ${PROD_PATH} /opt/backups/landing/landing_$(date +%Y%m%d_%H%M%S) 2>/dev/null || true
                    rm -rf ${PROD_PATH}/assets
                    cp -rf dist/. ${PROD_PATH}/
                    test -f ${PROD_PATH}/index.html
                    sudo /usr/bin/systemctl reload nginx
                '''
                echo "Disponible en: ${PROD_URL} y ${PROD_MX_URL}"
            }
        }
    }

    post {
        success {
            script {
                // historial
                sh '''
                    echo "$(date) | ${BUILD_NUMBER} | ${DEPLOY_ENV} | SUCCESS" >> /opt/apps/landing/deploy.log
                '''

                notify("SUCCESS")

                // alerta build lento
                def durationSec = currentBuild.duration / 1000
                if (durationSec > 120) {
                    notify("WARNING", "Build lento: ${durationSec}s")
                }
            }
        }

        failure {
            script {
                sh '''
                    echo "$(date) | ${BUILD_NUMBER} | ${DEPLOY_ENV} | FAILURE" >> /opt/apps/landing/deploy.log
                '''

                notify("FAILURE", "Revisar logs en Jenkins")

                // fallo consecutivo
                def prev = currentBuild.previousBuild
                if (prev && prev.result == "FAILURE") {
                    notify("CRITICAL", "🔥 Fallos consecutivos detectados")
                }
            }
        }

        cleanup {
            sh 'rm -f .env 2>/dev/null || true'
            cleanWs()
        }
    }
}