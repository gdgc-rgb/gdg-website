import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Community = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gcp-blue/10 via-background to-gcp-green/10 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gcp-blue to-gcp-green bg-clip-text text-transparent">
                Who We Are
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Google Developer Groups Campus (GDGC) – MLRIT Chapter is a vibrant student-driven tech community at MLR Institute of Technology. We aim to create a space where developers, designers, and innovators come together to learn, build, share, and grow with cutting-edge technologies.
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-6 leading-relaxed">
              We are part of the global GDG network, backed by Google, connecting thousands of developers and students worldwide.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="flex justify-center py-8">
          <div className="w-24 h-0.5 bg-gradient-to-r from-gcp-blue to-gcp-green"></div>
        </div>

        {/* Vision & Mission Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Vision */}
              <div className="bg-card rounded-2xl p-8 shadow-soft border border-border">
                <h2 className="text-3xl font-bold mb-6 text-gcp-blue">Our Vision</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To empower students with the skills, confidence, and resources needed to solve real-world problems using technology.
                </p>
              </div>

              {/* Mission */}
              <div className="bg-card rounded-2xl p-8 shadow-soft border border-border">
                <h2 className="text-3xl font-bold mb-6 text-gcp-green">Our Mission</h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-gcp-green mr-3 mt-1">•</span>
                    Conduct workshops, study jams, and hackathons on trending technologies.
                  </li>
                  <li className="flex items-start">
                    <span className="text-gcp-green mr-3 mt-1">•</span>
                    Foster collaboration between students, mentors, and industry experts.
                  </li>
                  <li className="flex items-start">
                    <span className="text-gcp-green mr-3 mt-1">•</span>
                    Encourage community projects that create meaningful impact.
                  </li>
                  <li className="flex items-start">
                    <span className="text-gcp-green mr-3 mt-1">•</span>
                    Build a culture of inclusivity, creativity, and innovation at MLRIT.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="flex justify-center py-8">
          <div className="w-24 h-0.5 bg-gradient-to-r from-gcp-blue to-gcp-green"></div>
        </div>

        {/* What We Do Section */}
        <section className="py-20 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">What We Do 🚀</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                At GDGC MLRIT, we organize a variety of activities to help students explore and grow
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 border-2 border-gcp-blue/30 hover:border-gcp-blue hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-semibold mb-3 text-gcp-blue">Workshops & Bootcamps</h3>
                <p className="text-muted-foreground">Hands-on learning on Web Development, Android, Cloud, AI/ML, and more.</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 border-2 border-gcp-green/30 hover:border-gcp-green hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-semibold mb-3 text-gcp-green">Tech Talks</h3>
                <p className="text-muted-foreground">Learn from experts and industry professionals.</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 border-2 border-gcp-yellow/30 hover:border-gcp-yellow hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-semibold mb-3 text-gcp-yellow">Hackathons & Competitions</h3>
                <p className="text-muted-foreground">Test skills, innovate, and showcase talent.</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 border-2 border-gcp-red/30 hover:border-gcp-red hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-semibold mb-3 text-gcp-red">Community Projects</h3>
                <p className="text-muted-foreground">Collaborate on impactful projects with peers.</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 border-2 border-gcp-blue/30 hover:border-gcp-blue hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-semibold mb-3 text-gcp-blue">Networking Events</h3>
                <p className="text-muted-foreground">Connect with developers across the globe.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Join Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Join GDGC MLRIT? 🌟</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Becoming part of our community opens the door to countless opportunities
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gcp-blue/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-gcp-blue font-bold">✓</span>
                </div>
                <p className="text-muted-foreground">Learn industry-relevant technologies</p>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gcp-green/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-gcp-green font-bold">✓</span>
                </div>
                <p className="text-muted-foreground">Gain hands-on project experience</p>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gcp-yellow/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-gcp-yellow font-bold">✓</span>
                </div>
                <p className="text-muted-foreground">Access Google resources, certificates, and swags</p>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gcp-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-gcp-red font-bold">✓</span>
                </div>
                <p className="text-muted-foreground">Enhance teamwork, leadership, and communication skills</p>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gcp-blue/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-gcp-blue font-bold">✓</span>
                </div>
                <p className="text-muted-foreground">Join a global network of developers and innovators</p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-20 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Core Values 💡</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gcp-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gcp-blue">Inclusivity</h3>
                <p className="text-muted-foreground">Open to all students, regardless of background or skill level</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gcp-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👥</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gcp-green">Collaboration</h3>
                <p className="text-muted-foreground">Building together, learning together</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gcp-yellow/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gcp-yellow">Innovation</h3>
                <p className="text-muted-foreground">Encouraging creativity and problem-solving</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gcp-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📈</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gcp-red">Growth</h3>
                <p className="text-muted-foreground">Focusing on both personal and professional development</p>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Achievements 🎯</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our community's impact and milestones
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card rounded-xl p-6 text-center border border-border">
                <div className="text-4xl font-bold text-gcp-blue mb-2">200+</div>
                <p className="text-muted-foreground">Cloud Study Jam 2024 participants</p>
              </div>
              
              <div className="bg-card rounded-xl p-6 text-center border border-border">
                <div className="text-4xl font-bold text-gcp-green mb-2">100+</div>
                <p className="text-muted-foreground">Students helped build their first app</p>
              </div>
              
              <div className="bg-card rounded-xl p-6 text-center border border-border">
                <div className="text-4xl font-bold text-gcp-yellow mb-2">30+</div>
                <p className="text-muted-foreground">Project submissions in internal Hackathon</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-hero rounded-2xl p-12 text-white">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">🌟 Want to learn, grow, and build with us?</h2>
              <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                Join the GDGC MLRIT community today and kickstart your developer journey!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors">
                  Join Us
                </button>
                <button className="border border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                  Follow Us
                </button>
              </div>
              <div className="mt-8 flex justify-center space-x-6">
                <a href="#" className="text-white/80 hover:text-white transition-colors">Instagram</a>
                <a href="#" className="text-white/80 hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="text-white/80 hover:text-white transition-colors">GitHub</a>
                <a href="#" className="text-white/80 hover:text-white transition-colors">Twitter</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Community;