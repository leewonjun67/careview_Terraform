resource "aws_db_subnet_group" "app_db_subnet_group" {

  name = "terraform-db-subnet-group"


  subnet_ids = [

    aws_subnet.private_db_a.id,
    aws_subnet.private_db_c.id

  ]

  tags = {

    Name = "terraform_db_subnet_group"


  }
}


resource "aws_db_instance" "app_db" {

  identifier = "terraform-postgres-db"


  engine         = "postgres"
  instance_class = "db.t3.micro"

  allocated_storage = 20
  storage_type      = "gp3"
  storage_encrypted = true


  db_name  = "careview"
  username = var.db_username
  password = var.db_password

  db_subnet_group_name = aws_db_subnet_group.app_db_subnet_group.name

  vpc_security_group_ids = [
    aws_security_group.rds_sg.id
  ]


  multi_az            = true
  publicly_accessible = false

  skip_final_snapshot = true

  tags = {

    Name = "terraform_postgresql_db"
  }
}
