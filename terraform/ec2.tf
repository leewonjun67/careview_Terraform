data "aws_ami" "amazon_linux" {


  most_recent = true
  owners      = ["amazon"]

  filter {

    name   = "name"
    values = ["al2023-ami-2023.*-x86_64"]
  }


  filter {

    name   = "virtualization-type"
    values = ["hvm"]
  }
}


resource "aws_launch_template" "app_lt" {


  name_prefix   = "terraform-app-"
  image_id      = data.aws_ami.amazon_linux.id
  instance_type = "t3.micro"

  iam_instance_profile {

    name = aws_iam_instance_profile.ec2_profile.name
  }



  vpc_security_group_ids = [

    aws_security_group.ec2_sg.id

  ]


  user_data = base64encode(<<-EOF
            #!/bin/bash

            dnf update -y
            dnf install -y docker awscli

            systemctl start docker
            systemctl enable docker

            usermod -aG docker ec2-user

            aws ecr get-login-password --region ap-northeast-2 | \
            docker login \
            --username AWS \
            --password-stdin ${split("/", aws_ecr_repository.app_repo.repository_url)[0]}

            docker pull ${aws_ecr_repository.app_repo.repository_url}:latest

            docker run -d \
              --name careview \
              --restart always \
              -p 80:8000 \
              -e CAREVIEW_SECRET_NAME=${var.backend_secret_name} \
              -e AWS_DEFAULT_REGION=ap-northeast-2 \
              ${aws_ecr_repository.app_repo.repository_url}:latest
            EOF
  )


  tag_specifications {


    resource_type = "instance"


    tags = {
      Name = "terraform_app_ec2"
    }
  }
}

resource "aws_autoscaling_group" "app_asg" {

  name = "terraform-app-asg"

  min_size         = 2
  max_size         = 4
  desired_capacity = 2

  vpc_zone_identifier = [

    aws_subnet.private_app_a.id,
    aws_subnet.private_app_c.id

  ]


  target_group_arns = [

    aws_lb_target_group.app_tg.arn

  ]


  launch_template {

    id      = aws_launch_template.app_lt.id
    version = "$Latest"
  }


  health_check_type         = "ELB"
  health_check_grace_period = 300


}

resource "aws_autoscaling_policy" "cpu_target_tracking" {

  name                   = "terraform-cpu-target-tracking"
  autoscaling_group_name = aws_autoscaling_group.app_asg.name
  policy_type            = "TargetTrackingScaling"


  target_tracking_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ASGAverageCPUUtilization"
    }

    target_value = 50.0

  }
}
