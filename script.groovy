def buildDockerImage() {
    dir('./backend') {
        echo "building docker image"
        withCredentials([usernamePassword(credentialsId: 'Dockerhub-Credentials', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
            sh "docker build -t ${USER}/backend-nabeel:2.0 ."
            sh "echo $PASS | docker login -u $USER --password-stdin"
            sh "docker push ${USER}/backend-nabeel:2.0"
        }
    }
}

def testApp() {
    echo "testing the app"    
}

def deployApp() {
    echo "deploying the app"
}

return this