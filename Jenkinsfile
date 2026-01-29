pipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'devthushari'
        FRONTEND_IMAGE = "${DOCKERHUB_USER}/devops_frontend:latest"
        BACKEND_IMAGE  = "${DOCKERHUB_USER}/devops_backend:latest"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Check Docker') {
            steps {
                sh 'docker --version'
            }
        }

        stage('Pull Images from Docker Hub') {
            steps {
                sh '''
                docker pull ${BACKEND_IMAGE}
                docker pull ${FRONTEND_IMAGE}
                '''
            }
        }

        stage('Deploy Containers') {
            steps {
                echo 'Removing old containers if they exist...'
                sh 'docker rm -f mongo_c backend_c frontend_c || true'

                echo 'Starting containers...'
                sh '''
                docker run -d --name mongo_c -p 27017:27017 mongo

                docker run -d --name backend_c \
                  -p 4000:4000 \
                  --link mongo_c:mongo \
                  -e MONGODB_URI='mongodb://mongo:27017/interncloud' \
                  ${BACKEND_IMAGE}

                docker run -d --name frontend_c \
                  -p 3000:5173 \
                  ${FRONTEND_IMAGE}
                '''
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished'
        }
    }
}
