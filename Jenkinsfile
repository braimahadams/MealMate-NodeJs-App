pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/braimah/meal-mate.git'
            }
        }

        stage('Build') {
            steps {
                echo "Hello World"
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

