pipeline {
    agent any
//     agent {
//             docker {
//                 image 'node'
// //                 args '-u root'
//             }
//         }
    environment {
            DOCKER_IMAGE = 'budzori'
        }
    tools {
            nodejs 'NodeJS installations'
        }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/zorigto-sambuev/budzori.git'
            }
        }
//         stage('Install Dependencies') {
//             steps {
// //                 sh 'npm config set cache $(pwd)/.npm-cache --global'
// //                 sh 'npm install --unsafe-perm'
//                 sh 'npm install'
//             }
//         }
        stage('Docker Build and Push') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
                sh 'docker tag $DOCKER_IMAGE zorigtos/$DOCKER_IMAGE:latest'
//                 withCredentials([string(credentialsId: 'docker-hub-credentials-id', variable: 'DOCKER_HUB_PASSWORD')]) {
//                     sh 'docker login -u <dockerhub-username> -p $DOCKER_HUB_PASSWORD'
//                 }
                sh 'docker push zorigtos/$DOCKER_IMAGE:latest'
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
                sh 'docker run -d -p 3000:3000 --name budzori --rm zorigtos/$DOCKER_IMAGE:latest'
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
