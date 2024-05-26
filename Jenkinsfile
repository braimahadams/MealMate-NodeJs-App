pipeline {
    agent any
    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    dir('./backend') {
                        echo "building docker image"
                        withCredentials([usernamePassword(credentialsId: 'Dockerhub-Credentials', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                            sh "docker build -t ${USER}/backend-nabeel:2.0 ./backend"
                            sh "echo $PASS | docker login -u $USER --password-stdin"
                            sh "docker push ${USER}/backend-nabeel:2.0"
                    }
                }
                }
            }
        }

        stage('Test') {
            steps {
                echo "testing" 
            }
        }

        stage('Deploy') {
            steps {
                echo "deploying"
            }
        }
    }
}

