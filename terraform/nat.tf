resource "aws_eip" "nat_a" {


  domain = "vpc"

  tags = {


    Name = "nat_eip_a"
  }
}


resource "aws_eip" "nat_c" {


  domain = "vpc"

  tags = {

    Name = "nat_eip_c"

  }
}


resource "aws_nat_gateway" "nat_a" {

  allocation_id = aws_eip.nat_a.id
  subnet_id     = aws_subnet.public_a.id


  tags = {

    Name = "nat_gateway_a"
  }

  depends_on = [aws_internet_gateway.igw]

}


resource "aws_nat_gateway" "nat_c" {


  allocation_id = aws_eip.nat_c.id
  subnet_id     = aws_subnet.public_c.id

  tags = {

    Name = "nat_gateway_c"
  }

  depends_on = [aws_internet_gateway.igw]

}
