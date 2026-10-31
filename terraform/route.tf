resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.my_vpc.id

  tags = {

    Name = "terraform_igw"
  }
}

resource "aws_route_table" "public_route" {

  vpc_id = aws_vpc.my_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id

  }

  tags = {
    Name = "public_route"

  }
}

resource "aws_route_table_association" "public_a" {

  subnet_id      = aws_subnet.public_a.id
  route_table_id = aws_route_table.public_route.id

}

resource "aws_route_table_association" "public_c" {

  subnet_id      = aws_subnet.public_c.id
  route_table_id = aws_route_table.public_route.id
}


resource "aws_route_table" "private_route_a" {
  vpc_id = aws_vpc.my_vpc.id

  route {

    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat_a.id
  }

  tags = {

    Name = "private_route_a"
  }
}

resource "aws_route_table" "private_route_c" {

  vpc_id = aws_vpc.my_vpc.id

  route {

    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat_c.id

  }
  tags = {

    Name = "private_route_c"
  }
}


resource "aws_route_table_association" "private_app_a" {

  subnet_id      = aws_subnet.private_app_a.id
  route_table_id = aws_route_table.private_route_a.id
}

resource "aws_route_table_association" "private_app_c" {

  subnet_id      = aws_subnet.private_app_c.id
  route_table_id = aws_route_table.private_route_c.id
}

resource "aws_route_table" "private_db_route" {

  vpc_id = aws_vpc.my_vpc.id

  tags = {

    Name = "private_db_route"
  }
}

resource "aws_route_table_association" "private_db_a" {


  subnet_id      = aws_subnet.private_db_a.id
  route_table_id = aws_route_table.private_db_route.id
}

resource "aws_route_table_association" "private_db_c" {

  subnet_id      = aws_subnet.private_db_c.id
  route_table_id = aws_route_table.private_db_route.id
}
