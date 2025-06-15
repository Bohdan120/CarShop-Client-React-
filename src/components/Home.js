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
                <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Автомобіль 1" />
                <div className="carousel-text">
                  <Title level={3} style={{ color: 'white', fontSize: '200px' }}>Car Shop</Title>
                </div>
              </div>
              <div className="carousel-slide">
                <img src="https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Автомобіль 2" />
                <div className="carousel-text">
                  <Title level={3} style={{ color: 'white', fontSize: '200px' }}>Car Shop</Title>
                </div>
              </div>
              <div className="carousel-slide">
                <img src="https://images.unsplash.com/photo-1689034915352-f33897491a81?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Автомобіль 3" />
                <div className="carousel-text">
                  <Title level={3} style={{ color: 'white', fontSize: '200px' }}>Car Shop</Title>
                </div>
              </div>
              <div className="carousel-slide">
                <img src="https://images.unsplash.com/photo-1699077922908-b40d91eac7c0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Автомобіль 4" />
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
          <Title level={1} className="section-title">Про CarShop</Title>
          <Paragraph style={{fontSize:"25px"}}>
            CarShop — ваш надійний партнер у пошуку ідеального автомобіля. Ми пропонуємо широкий вибір авто різних брендів, щоб ви могли знайти найкращий варіант відповідно до ваших потреб та бюджету. Наша команда експертів допоможе вам зробити обґрунтований вибір і забезпечить комфортний процес купівлі.
          </Paragraph>
          <Paragraph style={{fontSize:"25px"}}>
            Заснований у 2025 році, CarShop швидко став провідним ім’ям у сфері продажу автомобілів. Ми пишаємося високою якістю обслуговування та надійністю наших авто. Чи шукаєте ви нову модель або автомобіль з пробігом — у CarShop знайдеться щось для кожного.
          </Paragraph>
        </Col>
      </Row>
      <Divider />
      <Row className="section">
        <div className='servise-continer'>
        <Col span={24}>
          <Title level={1} className="section-title">Наші послуги</Title>
          <Row gutter={[16, 16]}>
            <Col span={12} md={8}>
              <ServiceItem
                icon={<EuroCircleOutlined />}
                title="Продаж автомобілів"
                text="Широкий вибір нових та вживаних авто."
              />
            </Col>
            <Col span={12} md={8}>
              <ServiceItem
                icon={<WalletOutlined/>}
                title="Фінансові послуги"
                text="Гнучкі умови фінансування, що підходять під ваш бюджет."
              />
            </Col>
            <Col span={12} md={8}>
              <ServiceItem
                icon={<PhoneOutlined />}
                title="Обслуговування авто"
                text="Повний спектр технічного обслуговування та ремонту."
              />
            </Col>
            <Col span={12} md={8}>
              <ServiceItem
                icon={<UsergroupDeleteOutlined />}
                title="Гарантія"
                text="Різні варіанти гарантійного обслуговування для вашого спокою."
              />
            </Col>
            <Col span={12} md={8}>
            <ServiceItem
              icon={<TrademarkCircleOutlined />}
              title="Тест-драйв"
              text="Можливість протестувати авто перед покупкою."
            />
          </Col>

            <Col span={12} md={8}>
              <ServiceItem
                icon={<SafetyCertificateOutlined />}
                title="Страхування"
                text="Комплексні страхові послуги для будь-яких автомобілів."
              />
            </Col>
          </Row>
        </Col>
        </div>
      </Row>
      <Row className="section statistics" style={{backgroundColor:"#393531"}}>
        <Col span={24}>
          <Title level={1} className="section-title" style={{color:"white"}}>Наші досягнення</Title>
          <Row gutter={[16, 16]}>
            <Col span={12} md={6}>
              <div className="statistic-item">
                <Title style={{color:"white"}} level={1}><CountUp start={0} end={1000} duration={5} /></Title>
                <Paragraph style={{color:"white", fontSize:"30px"}}>Продано авто</Paragraph>
              </div>
            </Col>
            <Col span={12} md={6}>
              <div className="statistic-item">
                <Title style={{color:"white"}} level={1}><CountUp start={0} end={100} duration={5} /></Title>
                <Paragraph style={{color:"white", fontSize:"30px"}}>Доступні моделі</Paragraph>
              </div>
            </Col>
            <Col span={12} md={6}>
              <div className="statistic-item">
                <Title style={{color:"white"}} level={1}><CountUp start={0} end={10} duration={5} /></Title>
                <Paragraph style={{color:"white", fontSize:"30px"}}>Міста обслуговування</Paragraph>
              </div>
            </Col>
            <Col span={12} md={6}>
              <div className="statistic-item">
                <Title style={{color:"white"}} level={1}><CountUp start={0} end={800} duration={5} /></Title>
                <Paragraph style={{color:"white", fontSize:"30px"}}>Задоволені клієнти</Paragraph>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Divider />
      <Row className="section customer-reviews" gutter={[16, 16]}>
        <Col span={24}>
          <Title level={1} className="section-title">Відгуки клієнтів</Title>
        </Col>

        <Col xs={24} sm={24} md={12} lg={8}>
          <Card>
            <Meta
              avatar={<Avatar src="https://cdn-icons-png.flaticon.com/512/5556/5556499.png" />}
              title="Джек Сміт"
              description={
                <>
                  <div style={{ marginBottom: 8 }}>
                    Відмінне обслуговування! Знайшов ідеальний автомобіль у CarShop. Обов’язково порекомендую друзям.
                  </div>
                  <div className="review-rating">
                    <Rate disabled defaultValue={5} />
                  </div>
                </>
              }
            />
          </Card>
        </Col>

        <Col xs={24} sm={24} md={12} lg={8}>
          <Card>
            <Meta
              avatar={<Avatar src="https://static.vecteezy.com/system/resources/previews/011/459/669/original/people-avatar-icon-png.png" />}
              title="Джейн Вільямс"
              description={
                <>
                  <div style={{ marginBottom: 8 }}>
                    Чудовий досвід з CarShop! Великий вибір та ввічливий персонал.
                  </div>
                  <div className="review-rating">
                    <Rate disabled defaultValue={5} />
                  </div>
                </>
              }
            />
          </Card>
        </Col>

        <Col xs={24} sm={24} md={12} lg={8}>
          <Card>
            <Meta
              avatar={<Avatar src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" />}
              title="Олександр Іваненко"
              description={
                <>
                  <div style={{ marginBottom: 8 }}>
                    Задоволений покупкою, авто як нове, сервіс на найвищому рівні.
                  </div>
                  <div className="review-rating">
                    <Rate disabled defaultValue={4} />
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
                <Title level={1}>Свобода вираження: новий Porsche Panamera 4</Title>
                <Paragraph style={{fontSize:"25px"}}>
                  Потужні пропорції. Потужна продуктивність. Новий Panamera 4 — це спортивний седан, від дизайну до динаміки, який без сумніву Porsche. Для тих, хто цінує не лише мету, а й шлях до неї.
                </Paragraph>
                <div className='buyPorsche'>
                  <Button block type="primary" style={{height:'auto', width:"200px", fontSize:"40px"}} onClick={handleBuyClick}>Купити</Button>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="video-container">
                <iframe
                  src="https://www.youtube.com/embed/CPmRNLYBObE?si=WkzLTGUC-AvQqUlK"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>

            </Col>
          </Row>
        </Col>
      </Row>
      <Divider />
      <Row className="section contact-info">
        <Col span={24}>
          <Title className="section-title" style={{color:"white", fontSize:"56px"}}>Контакти</Title>
          <div className="contact-block">
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <div className="contact-item">
                  <EnvironmentOutlined style={{ fontSize: '48px', color: '#F4801A',}}/>
                  <Paragraph className="contact-text">CarShop, Львів, Україна</Paragraph>
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
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d41188.10454459052!2d23.982339269531217!3d49.818843489612235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473add7c09109a57%3A0x4223c517012378e2!2z0JvRjNCy0ZbQsiwg0JvRjNCy0ZbQstGB0YzQutCwINC-0LHQu9Cw0YHRgtGMLCA3OTAwMA!5e0!3m2!1suk!2sua!4v1714495027185!5m2!1suk!2sua" frameBorder="0" style={{border:0, width:"100%", height:"300px"}} allowFullScreen></iframe>
      </Row>  
    </>
  );
};

export default Home;
