resource "aws_lb" "app_alb" {


  name               = "terraform-alb"
  internal           = false
  load_balancer_type = "application"


  security_groups = [
    aws_security_group.alb_sg.id
  ]


  subnets = [

    aws_subnet.public_a.id,
    aws_subnet.public_c.id
  ]


  tags = {

    Name = "terraform-alb"
  }
}


resource "aws_lb_target_group" "app_tg" {



  name        = "terraform-app-tg"
  port        = 80
  protocol    = "HTTP"
  target_type = "instance"
  vpc_id      = aws_vpc.my_vpc.id


  health_check {

    enabled             = true
    path                = "/"
    protocol            = "HTTP"
    port                = "traffic-port"
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 5
    interval            = 30

  }

  tags = {

    Name = "terraform_app_tg"

  }
}


resource "aws_lb_listener" "http_listener" {

  load_balancer_arn = aws_lb.app_alb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {

    type = "redirect"


    redirect {

      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"

    }

  }
}


resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.app_alb.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"

  certificate_arn = var.acm_certificate_arn

  default_action {

    type             = "forward"
    target_group_arn = aws_lb_target_group.app_tg.arn

  }
}
