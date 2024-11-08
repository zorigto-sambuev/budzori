pipeline {
    agent any
    tools {
            nodejs 'NodeJS installations'
        }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/zorigto-sambuev/budzori.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
//         stage('Test') {
//             steps {
// //                 sh 'npm test'
//             }
//         }
        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
                // Add your deployment steps here (e.g., upload files, restart server, etc.)
            }
        }
    }
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs for details.'
        }
    }
}
