// AboutPage.js
'use client';

import styles from './AboutPage.module.scss'; // Import SCSS module
import Head from 'next/head'; // Import Next.js Head component for SEO
import Footer from '../components/Footer'; // Import Footer component

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      <Head>
        <title>About Us | My Website</title>
        <meta name="description" content="Learn more about My Website, our mission, and the team behind our platform." />
        <meta property="og:title" content="About Us | My Website" />
        <meta property="og:description" content="Learn more about My Website, our mission, and the team behind our platform." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mywebsite.com/about" />
        <meta property="og:image" content="/images/og-image.jpg" />
        <link rel="canonical" href="https://mywebsite.com/about" />
      </Head>

      {/* About Us Section */}
      <section className={styles.aboutSection}>
        <h1 className={styles.title}>About Us</h1>
        <p className={styles.description}>
          Welcome to My Website, a platform dedicated to delivering high-quality content that informs, entertains, and inspires our audience. Our team is passionate about crafting meaningful insights and discussions that span technology, lifestyle, business, and culture. 
        </p>
        <p className={styles.description}>
          Our goal is to create a community of informed, empowered individuals who seek to enrich their personal and professional lives through knowledge, inspiration, and engagement.
        </p>
      </section>

      {/* Mission Section */}
      <section className={styles.missionSection}>
        <h2 className={styles.subtitle}>Our Mission</h2>
        <p className={styles.missionDescription}>
          At My Website, our mission is simple: to create a space where information and inspiration meet. We aim to deliver content that not only educates but also motivates our readers to make a positive impact in their daily lives, whether it's through personal growth, career advancement, or societal contributions.
        </p>
        <p className={styles.missionDescription}>
          We are driven by the belief that everyone deserves access to knowledge that can enhance their lives, and we are committed to sharing that knowledge with our global audience.
        </p>
      </section>

      {/* Team Section */}
      <section className={styles.teamSection}>
        <h2 className={styles.subtitle}>Meet Our Team</h2>
        <div className={styles.teamMembers}>
          <div className={styles.teamMember}>
            <img src="https://plus.unsplash.com/premium_photo-1664476788423-7899ac87bd7f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFsZXxlbnwwfHwwfHx8MA%3D%3D" alt="John" className={styles.teamMemberImage} />
            <h3 className={styles.teamMemberName}>John Doe</h3>
            <p className={styles.teamMemberRole}>CEO & Founder</p>
            <p className={styles.teamMemberBio}>
              John is the visionary behind My Website, with over a decade of experience in the tech and media industries. He is passionate about creating platforms that empower people through knowledge.
            </p>
          </div>
          <div className={styles.teamMember}>
            <img src="https://english.cdn.zeenews.com/sites/default/files/2017/11/17/639329-indian-men.jpg" alt="John Doe" className={styles.teamMemberImage} />
            <h3 className={styles.teamMemberName}>Jane Smith</h3>
            <p className={styles.teamMemberRole}>Lead Developer</p>
            <p className={styles.teamMemberBio}>
              With expertise in full-stack development, Jane leads our development team, ensuring that the website is user-friendly, fast, and reliable for all users.
            </p>
          </div>
          <div className={styles.teamMember}>
            <img src="https://www.shutterstock.com/image-photo/handsome-hispanic-senior-business-man-260nw-2343004193.jpg" alt="John Sina" className={styles.teamMemberImage} />
            <h3 className={styles.teamMemberName}>John Sina</h3>
            <p className={styles.teamMemberRole}>Co-Founder & Content Strategist</p>
            <p className={styles.teamMemberBio}>
              John brings a wealth of experience in content strategy, ensuring that every article on My Website is crafted to engage and educate our readers effectively.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
