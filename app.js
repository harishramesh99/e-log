// server.js
require('dotenv').config();
const express = require('express');
// const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./config/db');
const Navigation = require('./models/navigation');

const app = express();

// Connect to MongoDB
connectDB();

// EJS setup
// app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Static files
app.use(express.static('public'));

// Routes (will be added later)
app.get('/', async (req, res) => {
    try {
        const navItems = await Navigation.find({ position: 'header' })
            .sort('order');
        const footerItems = await Navigation.find({ position: 'footer' })
            .sort('order');
        
        res.render('home', {
            navItems,
            footerItems
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.get('/details', (req, res) => {
  res.render('details',{
    articles: [{
    image: '/img/girl2.jpg'}
    // ,
    // {image: '/img/girl1.jpg'},
    // {image: '/img/health2.jpg'},
    // {image: '/img/fruit.jpg'}

]}); 
});

app.get('/health', (req, res) => {
    res.render('health', {
      sectionTitle: 'Health',
      articles: [
        {
          image: '/img/health1.jpg',
          alt: 'Surfer on wave',
          title: 'Train Like a Pro Athlete',
          description: 'Learn how to train like professional athletes with these tips.',
          date: '9/3/2022',
          tag: 'SPORTS',
        },
        {
          image: '/img/face2.jpg',
          alt: 'Modern gym',
          title: 'The Evolution of Sports',
          description: 'Explore how sports have evolved over the years.',
          date: '5/31/2022',
          tag: 'SPORTS',
        },
        {
          image: '/img/health2.jpg',
          alt: 'Tennis racket',
          title: 'Latest Sports News',
          description: 'Catch up on the latest happenings in the sports world.',
          date: '12/15/2022',
          tag: 'SPORTS',
        },
        {
          image: '/img/fruit.jpg',
          alt: 'Person exercising',
          title: 'Fitness and Training Tips',
          description: 'Get fit with these effective training tips.',
          date: '11/10/2023',
          tag: 'SPORTS',
        },
      ],
    });
  });


  app.get('/design', (req, res) => {
    res.render('health', {
      sectionTitle: 'Design',
      articles: [
        {
          image: '/img/girl.jpg',
          alt: 'Surfer on wave',
          title: 'Train Like a Pro Athlete',
          description: 'Learn how to train like professional athletes with these tips.',
          date: '9/3/2022',
          tag: 'SPORTS',
        },
        {
          image: '/img/d1.jpg',
          alt: 'Modern gym',
          title: 'The Evolution of Sports',
          description: 'Explore how sports have evolved over the years.',
          date: '5/31/2022',
          tag: 'SPORTS',
        },
        {
          image: '/img/d2.jpg',
          alt: 'Tennis racket',
          title: 'Latest Sports News',
          description: 'Catch up on the latest happenings in the sports world.',
          date: '12/15/2022',
          tag: 'SPORTS',
        },
        {
          image: '/img/d3.jpg',
          alt: 'Person exercising',
          title: 'Fitness and Training Tips',
          description: 'Get fit with these effective training tips.',
          date: '11/10/2023',
          tag: 'SPORTS',
        },
      ],
    });
  });

  app.get('/tech', (req, res) => {
    res.render('health', {
      sectionTitle: 'Technology',
      articles: [
        {
          image: '/img/face.jpg',
          alt: 'Surfer on wave',
          title: 'Train Like a Pro Athlete',
          description: 'Learn how to train like professional athletes with these tips.',
          date: '9/3/2022',
          tag: 'SPORTS',
        },
        {
          image: '/img/t1.jpg',
          alt: 'Modern gym',
          title: 'The Evolution of Sports',
          description: 'Explore how sports have evolved over the years.',
          date: '5/31/2022',
          tag: 'SPORTS',
        },
        {
          image: '/img/t2.jpg',
          alt: 'Tennis racket',
          title: 'Latest Sports News',
          description: 'Catch up on the latest happenings in the sports world.',
          date: '12/15/2022',
          tag: 'SPORTS',
        },
        {
          image: '/img/t3.jpg',
          alt: 'Person exercising',
          title: 'Fitness and Training Tips',
          description: 'Get fit with these effective training tips.',
          date: '11/10/2023',
          tag: 'SPORTS',
        },
      ],
    });
  });

  app.get('/climate', (req, res) => {
    res.render('health', {
      sectionTitle: 'Design',
      articles: [
        {
          image: '/img/c1.jpg',
          alt: 'Surfer on wave',
          title: 'Train Like a Pro Athlete',
          description: 'Learn how to train like professional athletes with these tips.',
          date: '9/3/2022',
          tag: 'SPORTS',
        },
        {
          image: '/img/c2.jpg',
          alt: 'Modern gym',
          title: 'The Evolution of Sports',
          description: 'Explore how sports have evolved over the years.',
          date: '5/31/2022',
          tag: 'SPORTS',
        },
        {
          image: '/img/c3.jpg',
          alt: 'Tennis racket',
          title: 'Latest Sports News',
          description: 'Catch up on the latest happenings in the sports world.',
          date: '12/15/2022',
          tag: 'SPORTS',
        },
        {
          image: '/img/c4.jpg',
          alt: 'Person exercising',
          title: 'Fitness and Training Tips',
          description: 'Get fit with these effective training tips.',
          date: '11/10/2023',
          tag: 'SPORTS',
        },
      ],
    });
  });

  app.get('/sports', (req, res) => {
    res.render('health', {
      sectionTitle: 'Sports',
      articles: [
        {
          image: '/img/gym.jpg',
          alt: 'Surfer on wave',
          title: 'Train Like a Pro Athlete',
          description: 'Learn how to train like professional athletes with these tips.',
          date: '9/3/2022',
          tag: 'SPORTS',
        },
        {
          image: '/img/water.jpg',
          alt: 'Modern gym',
          title: 'The Evolution of Sports',
          description: 'Explore how sports have evolved over the years.',
          date: '5/31/2022',
          tag: 'SPORTS',
        },
        {
          image: '/img/ball.jpg',
          alt: 'Tennis racket',
          title: 'Latest Sports News',
          description: 'Catch up on the latest happenings in the sports world.',
          date: '12/15/2022',
          tag: 'SPORTS',
        },
        {
          image: '/img/basket.jpg',
          alt: 'Person exercising',
          title: 'Fitness and Training Tips',
          description: 'Get fit with these effective training tips.',
          date: '11/10/2023',
          tag: 'SPORTS',
        },
      ],
    });
  });

app.get('/signin', (req, res) => {
    res.render('signin'); // Renders the Sign In page
  });
  
app.get('/signup', (req, res) => {
    res.render('signup'); // Renders the Sign Up page
  });
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));