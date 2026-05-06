def webhook = "https://discord.com/api/webhooks/1501364059117715558/W_w1xbGHR_jifhNtdE9koiPjoaiXB2fYEJ62mAsMn9zSeOnQxLXasOWpPN9a-Is35Wsd"

def notify(status, extra="") {
    def color = status == "START" ? 3447003 : status == "SUCCESS" ? 3066993 : 15158332
    def url = params.DEPLOY_ENV == 'production' ? env.PROD_URL : env.STAGING_URL

    def payload = """
    {
      "embeds": [{
        "title": "🚀 Deploy ${status}",
        "color": ${color},
        "fields": [
          {"name":"Proyecto","value":"${env.JOB_NAME}","inline":true},
          {"name":"Build","value":"#${env.BUILD_NUMBER}","inline":true},
          {"name":"Env","value":"${params.DEPLOY_ENV}","inline":true},
          {"name":"Branch","value":"${env.GIT_BRANCH}","inline":true},
          {"name":"Commit","value":"${env.GIT_COMMIT.take(7)}","inline":true},
          {"name":"Autor","value":"${env.GIT_AUTHOR_NAME}","inline":true},
          {"name":"Duración","value":"${currentBuild.durationString ?: 'running'}","inline":true},
          {"name":"URL","value":"${url}","inline":true},
          {"name":"Build URL","value":"${env.BUILD_URL}","inline":false},
          {"name":"Extra","value":"${extra}","inline":false}
        ],
        "timestamp":"${new Date().format("yyyy-MM-dd'T'HH:mm:ss'Z'")}"
      }]
    }
    """
    sh "curl -s -H 'Content-Type: application/json' -X POST -d '${payload}' ${webhook}"
}

pipeline {
    agent any

    environment {
        PROD_URL='https://rokeindustries.com'
        STAGING_URL='https://rokeindustries.dev'
        BASE_PATH='/opt/apps/landing'
    }

    parameters {
        choice(name:'DEPLOY_ENV', choices:['staging','production'])
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
            }
        }

        stage('Notify START') {
            steps { script { notify("START") } }
        }

        stage('Build') {
            steps {
                sh '''
                    corepack enable
                    pnpm install --frozen-lockfile
                    pnpm run build
                '''
            }
        }

        stage('Prepare Release') {
            steps {
                script {
                    env.RELEASE = sh(script:"date +%Y%m%d_%H%M%S", returnStdout:true).trim()
                }

                sh '''
                    mkdir -p ${BASE_PATH}/releases/${RELEASE}
                    cp -r dist/. ${BASE_PATH}/releases/${RELEASE}/
                '''
            }
        }

        stage('Switch Release') {
            steps {
                sh '''
                    ln -sfn ${BASE_PATH}/releases/${RELEASE} ${BASE_PATH}/current
                    systemctl reload nginx
                '''
            }
        }

        stage('Health Check') {
            steps {
                script {
                    def url = params.DEPLOY_ENV == 'production' ? env.PROD_URL : env.STAGING_URL
                    def status = sh(script:"curl -o /dev/null -s -w '%{http_code}' ${url}", returnStdout:true).trim()

                    if (status != "200") {
                        error("Health check failed: ${status}")
                    }
                }
            }
        }
    }

    post {
        success {
            script {
                notify("SUCCESS", "Release: ${env.RELEASE}")
            }
        }

        failure {
            script {
                // 🔁 rollback automático
                sh '''
                    LAST=$(ls -t ${BASE_PATH}/releases | sed -n 2p)
                    if [ ! -z "$LAST" ]; then
                      ln -sfn ${BASE_PATH}/releases/$LAST ${BASE_PATH}/current
                      systemctl reload nginx
                    fi
                '''
                notify("FAILURE", "Rollback ejecutado")
            }
        }
    }
}