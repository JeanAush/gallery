pipeline {
    agent any
    environment {
        SLACK_CHANNEL = '#devops06'
        SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Start Server') {
            steps {
                sh 'node server.js'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
            post {
                failure {
                    mail to: 'jean.auma@student.moringaschool.com',
                    subject: 'failed tests',
                    body: 'The build for the test failed. Check your Jenkins console for details on the fail, thank you.'
                }
            }
        }
        post {
            success {
                slacksend(
                    channel: "${env.#devops06}",
                    webhookUrl: "${env.https://hooks.slack.com/services/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}",
                    color: 'good',
                    message: "Build Successful: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})"
                )
            }
            failure {
                slacksend(
                    channel: "${env.#devops06}",
                    webhookUrl: "${env.https://hooks.slack.com/services/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}",
                    color: 'danger',
                    message: "Build Failed: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})"
                )
            }
        }
        
    }
}