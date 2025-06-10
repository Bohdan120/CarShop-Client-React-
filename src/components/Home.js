import { Carousel, Typography, Row, Col, Card, Avatar, Divider, Rate, Button } from 'antd';
import { WalletOutlined, PhoneOutlined, EnvironmentOutlined, UsergroupDeleteOutlined, TrademarkCircleOutlined, EuroCircleOutlined, MailOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import CountUp from 'react-countup';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';


const { Title, Paragraph } = Typography;
const { Meta } = Card;

const ServiceItem = ({ icon, title, text }) => (
  <div className="service-item">
    <div className="service-icon">{icon}</div>
    <Title level={3} className="service-title">{title}</Title>
    <Paragraph className="service-text">{text}</Paragraph>
  </div>
);

const Home = () => {
  
  const navigate = useNavigate(); 
  
  const handleBuyClick = () => {
    navigate('/cars'); 
  };
  return (
    <>
      <Row>
        <Col span={24}>
          <div className="carousel-container">
            <Carousel autoplay>
              <div className="carousel-slide">
                <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Car 1" />
                <div className="carousel-text">
                  <Title level={3} style={{ color: 'white', fontSize: '200px' }}>Car Shop</Title>
                </div>
              </div>
              <div className="carousel-slide">
                <img src="https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Car 2" />
                <div className="carousel-text">
                  <Title level={3} style={{ color: 'white', fontSize: '200px' }}>Car Shop</Title>
                </div>
              </div>
              <div className="carousel-slide">
                <img src="https://images.unsplash.com/photo-1689034915352-f33897491a81?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Car 3" />
                <div className="carousel-text">
                  <Title level={3} style={{ color: 'white', fontSize: '200px' }}>Car Shop</Title>
                </div>
              </div>
              <div className="carousel-slide">
                <img src="https://images.unsplash.com/photo-1699077922908-b40d91eac7c0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Car 4" />
                <div className="carousel-text">
                  <Title level={3} style={{ color: 'white', fontSize: '200px' }}>Car Shop</Title>
                </div>
              </div>
            </Carousel>
          </div>
        </Col>
      </Row>
      <Row className="section">
        <Col span={24}>
          <Title level={1} className="section-title">About CarShop</Title>
          <Paragraph style={{fontSize:"25px"}}>
            CarShop is your trusted partner in finding the perfect car. With a wide range of vehicles from various brands, we aim to provide you with the best options that suit your needs and budget. Our team of experts is dedicated to helping you make an informed decision and ensuring a seamless buying experience.
          </Paragraph>
          <Paragraph style={{fontSize:"25px"}}>
            Established in 2025, CarShop has quickly become a leading name in the car sales industry. We pride ourselves on our customer service and the quality of our cars. Whether you are looking for a brand-new model or a pre-owned vehicle, CarHub has something for everyone.
          </Paragraph>
        </Col>
      </Row>
      <Divider />
      <Row className="section">
        <div className='servise-continer'>
        <Col span={24}>
          <Title level={1} className="section-title">Our Services</Title>
          <Row gutter={[16, 16]}>
            <Col span={12} md={8}>
              <ServiceItem
                icon={<EuroCircleOutlined />}
                title="Vehicle Sales"
                text="A wide range of new and pre-owned vehicles."
              />
            </Col>
            <Col span={12} md={8}>
              <ServiceItem
                icon={<WalletOutlined/>}
                title="Financing Options"
                text="Flexible financing solutions to fit your budget."
              />
            </Col>
            <Col span={12} md={8}>
              <ServiceItem
                icon={<PhoneOutlined />}
                title="Vehicle Servicing"
                text="Comprehensive maintenance and repair services."
              />
            </Col>
            <Col span={12} md={8}>
              <ServiceItem
                icon={<UsergroupDeleteOutlined />}
                title="Warranty"
                text="Various warranty options for your peace of mind."
              />
            </Col>
            <Col span={12} md={8}>
              <ServiceItem
                icon={<TrademarkCircleOutlined />}
                title="Trade-In"
                text="Fair valuation for your trade-in vehicles."
              />
            </Col>
            <Col span={12} md={8}>
              <ServiceItem
                icon={<SafetyCertificateOutlined />} // Нова іконка
                title="Insurance Services"
                text="Comprehensive insurance solutions for all vehicles."
              />
            </Col>
          </Row>
        </Col>
        </div>
      </Row>
      <Row className="section statistics" style={{backgroundColor:"#393531"}}>
        <Col span={24}>
          <Title level={1} className="section-title" style={{color:"white"}}>Our Achievements</Title>
          <Row gutter={[16, 16]}>
            <Col span={12} md={6}>
              <div className="statistic-item">
                <Title style={{color:"white"}} level={1}><CountUp start={0} end={5000} duration={5} /></Title>
                <Paragraph style={{color:"white", fontSize:"30px"}}>Cars Sold</Paragraph>
              </div>
            </Col>
            <Col span={12} md={6}>
              <div className="statistic-item">
                <Title style={{color:"white"}} level={1}><CountUp start={0} end={200} duration={5} /></Title>
                <Paragraph style={{color:"white", fontSize:"30px"}}>Models Available</Paragraph>
              </div>
            </Col>
            <Col span={12} md={6}>
              <div className="statistic-item">
                <Title style={{color:"white"}} level={1}><CountUp start={0} end={100} duration={5} /></Title>
                <Paragraph style={{color:"white", fontSize:"30px"}}>Cities Served</Paragraph>
              </div>
            </Col>
            <Col span={12} md={6}>
              <div className="statistic-item">
                <Title style={{color:"white"}} level={1}><CountUp start={0} end={3000} duration={5} /></Title>
                <Paragraph style={{color:"white", fontSize:"30px"}}>Satisfied Customers</Paragraph>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Divider />
      <Row className="section customer-reviews">
        <Col span={24}>
          <Title level={1} className="section-title">Customer Reviews</Title>
        </Col>
        <Col span={8}>
          <Card>
            <Meta
              avatar={<Avatar src="https://cdn-icons-png.flaticon.com/512/5556/5556499.png" />}
              title="Jack Smith"
              description={
                <>
                  Excellent service! Found the perfect car at CarShop. Will definitely recommend to friends.
                  <div>
                    <Rate disabled defaultValue={5} />
                  </div>
                </>
              }
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Meta
              avatar={<Avatar src="https://static.vecteezy.com/system/resources/previews/011/459/669/original/people-avatar-icon-png.png" />}
              title="Jane Williams"
              description={
                <>
                  Wonderful experience with CarShop! Great selection and helpful staff.
                  <div>
                    <Rate disabled defaultValue={5} />
                  </div>
                </>
              }
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Meta
              avatar={<Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIn-gE6j6sjvg0ekFgFBIzVP5VdN3aBu9dLg&s" />}
              title="Alex Johnson"
              description={
                <>
                  Couldn't be happier with my purchase from CarShop. Thank you for the great service!
                  <div>
                    <Rate disabled defaultValue={5} />
                  </div>
                </>
              }
            />
          </Card>
        </Col>
      </Row>
      <Divider />
      <Row className="section video-section">
        <Col span={24}>
          <Row gutter={[16, 16]} align="middle">
            <Col span={12}>
              <div className="video-text">
                <Title level={1}>Freedom to express yourself: the new Porsche Panamera 4</Title>
                <Paragraph style={{fontSize:"25px"}}>
                Powerful proportions. Powerful performance. The new Panamera 4 is a sports saloon, from its styling to its dynamics, that’s unmistakably Porsche. For those who look beyond the destination and instead to how you reach it.  
                </Paragraph>
                <div className='buyPorsche'>
                <Button block type="primary" style={{height:'auto', width:"200px", fontSize:"40px"}} onClick={handleBuyClick}>Buy</Button>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="video-container">
              <iframe width="860" height="415" src="https://www.youtube.com/embed/CPmRNLYBObE?si=WkzLTGUC-AvQqUlK" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Divider />
      <Row className="section contact-info">
        <Col span={24}>
          <Title className="section-title" style={{color:"white", fontSize:"56px"}}>Contact Us</Title>
          <div className="contact-block">
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <div className="contact-item">
                  <EnvironmentOutlined  style={{ fontSize: '48px', color: '#F4801A',}}/>
                  <Paragraph className="contact-text">CarShop, Lviv, Ukraine</Paragraph>
                </div>
              </Col>
              <Col span={8}>
                <div className="contact-item">
                  <PhoneOutlined style={{ fontSize: '48px', color: '#F4801A' }} />
                  <Paragraph className="contact-text">(380) 456-7890</Paragraph>
                </div>
              </Col>
              <Col span={8}>
                <div className="contact-item">
                  <MailOutlined style={{ fontSize: '48px', color: '#F4801A' }} />
                  <Paragraph className="contact-text">info@carshop.com</Paragraph>
                </div>
              </Col>
            </Row>          
          </div>
        </Col>
      </Row>    
      <Row>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d41188.10454459052!2d23.982339269531217!3d49.818843489612235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473add7c09109a57%3A0x4223c517012378e2!2z0JvRjNCy0ZbQsiwg0JvRjNCy0ZbQstGB0YzQutCwINC-0LHQu9Cw0YHRgtGMLCA3OTAwMA!5e0!3m2!1suk!2sua!4v1714495027185!5m2!1suk!2sua" frameborder="0" style={{border:0, width:"100%", height:"300px"}} allowfullscreen></iframe>
      </Row>  
    </>
  );
};

export default Home;