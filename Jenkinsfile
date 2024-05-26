def gv

pipeline {
    agent any
    stages {
        stage('Init') {
            steps {
                script {
                    gv = load "script.groovy"
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    gv.buildDockerImage()
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    gv.testApp()
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    gv.deployApp()
                }
            }
        }
    }
}