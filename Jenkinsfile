// ==========================
// 🔔 DISCORD NOTIFY FUNCTION
// ==========================
def notify(status, extra="") {
    def colorMap = [
        "START":    3447003,
        "SUCCESS":  3066993,
        "FAILURE":  15158332,
        "WARNING":  15844367,
        "CRITICAL": 10038562
    ]

    def color = colorMap[status] ?: 3447003
    def url = params.DEPLOY_ENV == 'production' ? env.PROD_URL : env.DEV_URL

    def isProd = params.DEPLOY_ENV == 'production'
    def mention = (status in ["FAILURE","CRITICAL"] && isProd) ? "<@&TU_ROLE_ID>" : ""

    def payload = """
    {
      "content": "${mention}",
      "embeds": [{
        "title": "🚀 Deploy Landing ${status}",
        "color": ${color},
        "fields": [
          {"name":"Proyecto","value":"${env.JOB_NAME}","inline":true},
          {"name":"Versión","value":"${env.NEW_VERSION ?: 'N/A'}","inline":true},
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
      curl -s -H 'Content-Type: application/json' \\
           -X POST \\
           -d '${payload}' \\
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
        // ── Producción (Dell — local) ──────────────────────────
        PROD_URL      = 'https://rokeindustries.com'
        PROD_MX_URL   = 'https://rokeindustries.com.mx'
        PROD_PATH     = '/opt/apps/landing'
        ENV_PROD_PATH = '/opt/apps/landing/.env.production'

        // ── DEV (Mac Mini — remoto vía Tailscale) ─────────────
        DEV_URL       = 'https://rokeindustries.dev'
        DEV_HOST      = '100.72.162.112'
        DEV_USER      = 'rokedev'
        DEV_PATH      = '/opt/apps/landing-dev'
        ENV_DEV_PATH  = '/opt/apps/landing-dev/.env.dev'

        DISCORD_WEBHOOK = 'https://discord.com/api/webhooks/1501364059117715558/W_w1xbGHR_jifhNtdE9koiPjoaiXB2fYEJ62mAsMn9zSeOnQxLXasOWpPN9a-Is35Wsd'
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        disableConcurrentBuilds()
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
    }

    parameters {
        choice(name: 'DEPLOY_ENV', choices: ['none', 'dev', 'production'])
        booleanParam(name: 'RUN_LINT', defaultValue: true)
        booleanParam(name: 'RUN_FORMAT_CHECK', defaultValue: false)
        booleanParam(name: 'SKIP_TESTS', defaultValue: true)
        // ── Versionado automático (Conventional Commits) ──
        booleanParam(name: 'AUTO_VERSION', defaultValue: true,
            description: 'Calcular la versión automáticamente a partir de los commits (feat/fix/BREAKING).')
        string(name: 'GIT_CREDENTIALS_ID', defaultValue: 'github-credentials',
            description: 'ID del credencial (usuario + token) de GitHub en Jenkins para publicar el tag de versión en producción.')
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
                script {
                    env.GIT_BRANCH      = sh(script: "git rev-parse --abbrev-ref HEAD", returnStdout: true).trim()
                    env.GIT_COMMIT      = sh(script: "git rev-parse HEAD", returnStdout: true).trim()
                    env.GIT_AUTHOR_NAME = sh(script: "git log -1 --pretty=format:'%an'", returnStdout: true).trim()
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

        stage('Validar branch') {
    when { expression { params.DEPLOY_ENV != 'none' } }
    steps {
        script {
            def branch = env.GIT_BRANCH?.replaceAll('origin/', '').trim()
                      ?: env.BRANCH_NAME?.trim()
                      ?: sh(returnStdout: true,
                            script: "git name-rev --name-only HEAD | sed 's|remotes/origin/||'").trim()

            echo "Branch detectado: ${branch}"
            echo "Env seleccionado: ${params.DEPLOY_ENV}"

            if (params.DEPLOY_ENV == 'production' && branch != 'master') {
                error("Produccion solo desde master. Branch actual: ${branch}")
            }
            if (params.DEPLOY_ENV == 'dev' && branch != 'develop') {
                error("DEV solo desde develop. Branch actual: ${branch}")
            }

            echo "Validacion OK — Branch: ${branch} | Env: ${params.DEPLOY_ENV}"
        }
    }
}

        stage('Versionado automatico') {
            when { expression { params.DEPLOY_ENV != 'none' && params.AUTO_VERSION } }
            steps {
                script {
                    // Necesitamos los tags para calcular el incremento semántico
                    sh 'git fetch --tags --force || true'

                    // produccion -> versión estable (X.Y.Z)
                    // dev        -> pre-release (X.Y.Z-dev.<build>+<sha>)
                    def channel = params.DEPLOY_ENV == 'production' ? 'stable' : 'dev'

                    env.NEW_VERSION = sh(
                        script: "sh scripts/auto-version.sh ${channel} ${env.BUILD_NUMBER}",
                        returnStdout: true
                    ).trim()

                    echo "Versión calculada (${channel}): ${env.NEW_VERSION}"

                    // Escribir en package.json para que Vite la inyecte en el build
                    sh 'sh scripts/apply-version.sh "$NEW_VERSION"'
                }
            }
        }

        stage('Load Environment') {
            when { expression { params.DEPLOY_ENV != 'none' } }
            steps {
                script {
                    if (params.DEPLOY_ENV == 'production') {
                        sh "cp ${ENV_PROD_PATH} .env"
                        sh "echo '.env cargado desde: ${ENV_PROD_PATH}'"
                    } else {
                        // DEV — jalar .env desde el Mac Mini
                        withCredentials([sshUserPrivateKey(
                            credentialsId: 'mac-mini-deploy-key',
                            keyFileVariable: 'SSH_KEY'
                        )]) {
                            sh """
                                scp -i \$SSH_KEY -o StrictHostKeyChecking=no \
                                    ${DEV_USER}@${DEV_HOST}:${ENV_DEV_PATH} .env
                                echo ".env cargado desde Mac Mini: ${ENV_DEV_PATH}"
                            """
                        }
                    }
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
                    steps { sh 'pnpm lint' }
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
                    def buildCmd = params.DEPLOY_ENV == 'dev'
                        ? 'pnpm run build:staging'
                        : 'pnpm run build'

                    sh """
                        ${buildCmd}
                        test -d dist
                        test -f dist/index.html
                    """

                    env.BUILD_SIZE = sh(script: "du -sh dist | cut -f1", returnStdout: true).trim()
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

        // ── Deploy DEV → Mac Mini (remoto via SSH) ─────────────────────
        stage('Deploy DEV') {
            when { expression { params.DEPLOY_ENV == 'dev' } }
            steps {
                withCredentials([sshUserPrivateKey(
                    credentialsId: 'mac-mini-deploy-key',
                    keyFileVariable: 'SSH_KEY'
                )]) {
                    // Crear directorio si no existe
                    sh """
                        ssh -i \$SSH_KEY -o StrictHostKeyChecking=no \
                            ${DEV_USER}@${DEV_HOST} \
                            "mkdir -p ${DEV_PATH}"
                    """

                    // Sincronizar build al Mac Mini
                    sh """
                        rsync -az --delete \
                            -e "ssh -i \$SSH_KEY -o StrictHostKeyChecking=no" \
                            dist/ \
                            ${DEV_USER}@${DEV_HOST}:${DEV_PATH}/
                    """

                    // Verificar y recargar Nginx
                    sh """
                        ssh -i \$SSH_KEY -o StrictHostKeyChecking=no \
                            ${DEV_USER}@${DEV_HOST} bash << 'REMOTE'
                                set -e
                                test -f ${DEV_PATH}/index.html && echo "Deploy DEV exitoso"
                                sudo systemctl reload nginx
REMOTE
                    """
                }
                echo "Disponible en: ${DEV_URL}"
            }
        }

        // ── Deploy PRODUCCIÓN → Dell (local) ───────────────────────────
        stage('Deploy Production') {
            when { expression { params.DEPLOY_ENV == 'production' } }
            steps {
                sh """
                    mkdir -p /opt/backups/landing
                    cp -r ${PROD_PATH} /opt/backups/landing/landing_\$(date +%Y%m%d_%H%M%S) 2>/dev/null || true
                    rm -rf ${PROD_PATH}/assets
                    cp -rf dist/. ${PROD_PATH}/
                    test -f ${PROD_PATH}/index.html
                    sudo /usr/bin/systemctl reload nginx
                """
                echo "Disponible en: ${PROD_URL} y ${PROD_MX_URL}"
            }
        }
    }

    post {
        success {
            script {
                sh """
                    echo "\$(date) | ${BUILD_NUMBER} | ${params.DEPLOY_ENV} | SUCCESS" >> /opt/apps/landing/deploy.log
                """

                // ── Publicar release: commit del bump + tag semántico en GitHub ──
                // Solo en producción y solo si el deploy completo fue exitoso.
                if (params.DEPLOY_ENV == 'production' && params.AUTO_VERSION && env.NEW_VERSION?.trim()) {
                    try {
                        withCredentials([usernamePassword(
                            credentialsId: params.GIT_CREDENTIALS_ID,
                            usernameVariable: 'GIT_USER',
                            passwordVariable: 'GIT_TOKEN'
                        )]) {
                            sh 'sh scripts/release-tag.sh "$NEW_VERSION" master'
                        }
                    } catch (err) {
                        notify("WARNING", "Deploy OK pero no se pudo publicar el tag v${env.NEW_VERSION}: ${err.message}")
                    }
                }

                notify("SUCCESS")
                def durationSec = currentBuild.duration / 1000
                if (durationSec > 120) {
                    notify("WARNING", "Build lento: ${durationSec}s")
                }
            }
        }

        failure {
            script {
                sh """
                    echo "\$(date) | ${BUILD_NUMBER} | ${params.DEPLOY_ENV} | FAILURE" >> /opt/apps/landing/deploy.log
                """
                notify("FAILURE", "Revisar logs en Jenkins")
                def prev = currentBuild.previousBuild
                if (prev && prev.result == "FAILURE") {
                    notify("CRITICAL", "🔥 Fallos consecutivos detectados")
                }
            }
        }

        cleanup {
            // sh 'rm -f .env 2>/dev/null || true'
            cleanWs()
        }
    }
}
