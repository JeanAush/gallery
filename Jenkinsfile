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
                sh 'npm install -g pm2'
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
                sh 'npm test'
            }
            post {
                failure {
                    mail to: 'jean.auma@student.moringaschool.com',
                         subject: 'Failed Tests',
                         body: 'The build for the test failed. Check your Jenkins console for details on the fail, thank you.'
                }
            }
        }
    }

    post {
        success {
            slackSend(
                channel: env.devops06,
                color: 'good',
                message: "Build Successful: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})",
                tokenCredentialId: 'A07AWNX83BJ'
            )
        }
        failure {
            slackSend(
                channel: env.devops06,
                color: 'danger',
                message: "Build Failed: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})",
                tokenCredentialId: 'A07AWNX83BJ'
            )
        }
    }
}