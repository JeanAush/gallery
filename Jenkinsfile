pipeline {
    agent any
    environment {
        SLACK_CHANNEL = '#devops06'
        SLACK_WEBHOOK_URL = credentials('A07AWNX83BJ')
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                sh 'npm install pm2'
            }
        }

        stage('Start Server') {
            steps {
                script {
                    try {
                        sh 'npx pm2 delete server || true'
                    } catch (Exception e) {
                        echo "No server was running"
                    }
                    sh 'npx pm2 start server.js --name server'
                }
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    try {
                        sh 'npx pm2 stop server || true'
                    } catch (Exception e) {
                        echo "No server was running"
                    }
                    sh 'npm test'
                }
            }
            post {
        success {
            emailext attachLog: true,
                body: """<p>EXECUTED: Job <b>'${env.JOB_NAME}:${env.BUILD_NUMBER}'</b></p>
                        <p>View console output at <a href="${env.BUILD_URL}">${env.JOB_NAME}:${env.BUILD_NUMBER}</a></p> 
                        <p><i>(Build log is attached.)</i></p>""",
                subject: "Status: 'SUCCESS' - Job '${env.JOB_NAME}:${env.BUILD_NUMBER}'",
                to: 'jean.auma@student.moringaschool.com'
        }
        failure {
            emailext attachLog: true,
                body: """<p>EXECUTED: Job <b>'${env.JOB_NAME}:${env.BUILD_NUMBER}'</b></p>
                        <p>View console output at <a href="${env.BUILD_URL}">${env.JOB_NAME}:${env.BUILD_NUMBER}</a></p> 
                        <p><i>(Build log is attached.)</i></p>""",
                subject: "Status: FAILURE - Job '${env.JOB_NAME}:${env.BUILD_NUMBER}'",
                to: 'jean.auma@student.moringaschool.com'
        }
    }
        }
        stage('Restart Server') {
            steps {
                script {
                    try {
                        sh 'npx pm2 restart server || npx pm2 start server.js --name server'
                    } catch (Exception e) {
                        echo "Failed to restart the server, attempting to start it again."
                        sh 'npx pm2 start server.js --name server'
                    }
                }
            }
        }
    }

    post {
        success {
            slackSend(
                channel: env.SLACK_CHANNEL,
                color: 'good',
                message: "Build Successful: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})",
                tokenCredentialId: 'A07AWNX83BJ'
            )
        }
        failure {
            slackSend(
                channel: env.SLACK_CHANNEL,
                color: 'danger',
                message: "Build Failed: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})",
                tokenCredentialId: 'A07AWNX83BJ'
            )
        }
    }
}
