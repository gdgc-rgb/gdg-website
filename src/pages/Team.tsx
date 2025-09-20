import { teamMembers } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Team = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gcp-red/10 via-background to-gcp-yellow/10 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gcp-red to-gcp-yellow bg-clip-text text-transparent">
                Meet Our Core Team
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The passionate individuals working behind the scenes to make Google Cloud Study Jam an amazing experience
            </p>
          </div>
        </section>

        {/* Team Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  className="gcp-card bg-card rounded-xl overflow-hidden border border-border group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-square overflow-hidden bg-gradient-to-br from-gcp-blue/20 to-gcp-green/20">
                    <img
                      src={member.photoUrl}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.position}</p>
                    {member.bio && (
                      <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join Our Team CTA */}
        <section className="py-20 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-card rounded-2xl p-12 text-center shadow-soft border border-border">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Want to Join Our Team?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                We're always looking for passionate individuals who want to contribute to the community 
                and help others learn Google Cloud Platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-gcp-primary">
                  Apply to Join
                </button>
                <button className="btn-gcp-secondary">
                  Learn About Roles
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Team Values */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Team Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide our team and shape our community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-red-bg rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Focus on Learning</h3>
                <p className="text-muted-foreground">
                  We prioritize creating the best learning experiences for our community members.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-yellow-bg rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Collaboration</h3>
                <p className="text-muted-foreground">
                  We believe in the power of working together and supporting each other's growth.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-green-bg rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌟</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                <p className="text-muted-foreground">
                  We encourage creative thinking and innovative approaches to problem-solving.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Team;