pipeline {
    agent any

    environment {
        DOCKERHUB_CREDS = 'dockerhub-creds'
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

        stage('Build & Tag Images') {
            steps {
                echo 'Building and tagging images...'
                // Build with the tag we want to push
                sh "docker build -t ${BACKEND_IMAGE} ./backend"
                sh "docker build -t ${FRONTEND_IMAGE} ./frontend"
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                // Use Jenkins credentials to login and push
                withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CREDS}", usernameVariable: 'DH_USER', passwordVariable: 'DH_PASS')]) {
                    sh 'echo $DH_PASS | docker login -u $DH_USER --password-stdin'
                    sh "docker push ${BACKEND_IMAGE}"
                    sh "docker push ${FRONTEND_IMAGE}"
                    sh 'docker logout'
                }
            }
        }

        stage('Deploy Containers') {
            steps {
                echo 'Cleaning up old containers...'
                // This stops containers defined in your docker-compose.yml
                sh 'docker-compose down || true'
                sh 'docker rm -f mongo_c backend_c frontend_c || true'

                echo 'Deploying to EC2 using Docker Compose...'
                // Pull latest images from Docker Hub to ensure EC2 isn't using old cache
                sh 'docker-compose pull'
                // Start services in detached mode
                sh 'docker-compose up -d'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up unused images to save disk space on EC2...'
            sh 'docker image prune -f'
        }
    }
}