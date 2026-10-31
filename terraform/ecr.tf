resource "aws_ecr_repository" "app_repo" {

  name = "terraform-fastapi-app"


  image_scanning_configuration {


    scan_on_push = true
  }


  tags = {

    Name = "terraform_fastapi_app"

  }
}


output "ecr_repository_url" {
  value = aws_ecr_repository.app_repo.repository_url

}
