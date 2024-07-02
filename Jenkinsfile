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
            }
        }

        stage('Start Server') {
            steps {
                script {
                    try {
                        sh 'lsof -i :5000 | grep node | awk \'{print $2}\' | xargs kill -9'
                    } catch (Exception e) {
                    }
                    sh 'nohup node server.js > server.log 2>&1 &'
                }
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
            post {
        success {
            emailext attachLog: true, 
                body:
                    """
                    <p>EXECUTED: Job <b>\'${env.JOB_NAME}:${env.BUILD_NUMBER})\'</b></p>
                    <p>
                    View console output at 
                    "<a href="${env.BUILD_URL}">${env.JOB_NAME}:${env.BUILD_NUMBER}</a>"
                    </p> 
                      <p><i>(Build log is attached.)</i></p>
                    """,
                subject: "Status: 'SUCCESS' -Job \'${env.JOB_NAME}:${env.BUILD_NUMBER}\'", 
                to: 'jean.auma@student.moringaschool.com'
        }
        failure {
            emailext attachLog: true, 
                body:
                    """
                    <p>EXECUTED: Job <b>\'${env.JOB_NAME}:${env.BUILD_NUMBER})\'</b></p>
                    <p>
                    View console output at 
                    "<a href="${env.BUILD_URL}">${env.JOB_NAME}:${env.BUILD_NUMBER}</a>"
                    </p> 
                      <p><i>(Build log is attached.)</i></p>
                    """,
                subject: "Status: FAILURE -Job \'${env.JOB_NAME}:${env.BUILD_NUMBER}\'", 
                to: 'jean.auma@student.moringaschool.com'
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