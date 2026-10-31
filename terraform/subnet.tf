resource "aws_subnet" "public_a" {
  vpc_id            = aws_vpc.my_vpc.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "ap-northeast-2a"


  tags = {
    Name = "public_subnet_a"
  }
}

resource "aws_subnet" "public_c" {

  vpc_id            = aws_vpc.my_vpc.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "ap-northeast-2c"

  tags = {
    Name = "public_subnet_c"
  }
}

resource "aws_subnet" "private_app_a" {

  vpc_id            = aws_vpc.my_vpc.id
  cidr_block        = "10.0.11.0/24"
  availability_zone = "ap-northeast-2a"

  tags = {
    Name = "private_app_subnet_a"
  }
}

resource "aws_subnet" "private_app_c" {

  vpc_id            = aws_vpc.my_vpc.id
  cidr_block        = "10.0.12.0/24"
  availability_zone = "ap-northeast-2c"

  tags = {
    Name = "private_app_subnet_c"
  }
}


resource "aws_subnet" "private_db_a" {

  vpc_id            = aws_vpc.my_vpc.id
  cidr_block        = "10.0.21.0/24"
  availability_zone = "ap-northeast-2a"

  tags = {
    Name = "private_db_subnet_a"
  }
}

resource "aws_subnet" "private_db_c" {

  vpc_id            = aws_vpc.my_vpc.id
  cidr_block        = "10.0.22.0/24"
  availability_zone = "ap-northeast-2c"

  tags = {
    Name = "private_db_subnet_c"
  }
}
