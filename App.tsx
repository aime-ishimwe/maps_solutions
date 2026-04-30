import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  Droplets,
  Zap,
  Hammer,
  ShieldCheck,
  Award,
  Clock,
  Lightbulb,
  Phone,
  Mail,
  ChevronRight,
  CheckCircle2,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  MapPin,
  ArrowRight,
  Star,
  Users,
  HardHat,
  PhoneCall
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import logo from './images/logo.jpeg';
import imgCeilingGeyser from './images/Ceiling Geyser Installation & Safety Inspection.jpeg';
import imgKitchenFixture from './images/Kitchen & Bathroom Fixture Upgrades.jpeg';
import imgBurstPipe from './images/Burst Pipe Repairs.jpeg';
import imgHorizontalGeyser from './images/Compliant Geyser Installation With Vacuum Breakers.jpeg';
import imgMainLine from './images/Main Line & External Drainage Excavation.jpeg';
import imgUnderSink from './images/Under-Sink Drainage & Pipe Maintenance.jpeg';

const FadeInWhenVisible = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number, key?: string | number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

const Logo = ({ className = "w-12 h-12" }: { className?: string }) => (
  <img src={logo} className={`${className} object-contain rounded-xl`} alt="MAPS SOLUTIONS Logo" />
);

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [phoneError, setPhoneError] = useState('');

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const validatePhone = (phone: string) => {
    const re = /^[0-9\s+]{10,15}$/;
    return re.test(phone);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const phone = formData.get('phone') as string;

    if (!validatePhone(phone)) {
      setPhoneError('Please enter a valid phone number (10-15 digits)');
      return;
    }

    setPhoneError('');
    setFormStatus('submitting');

    fetch('https://formsubmit.co/ajax/mapsgroupsolutions@gmail.com', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: formData.get('name'),
        phone,
        email: formData.get('email'),
        message: formData.get('message')
      })
    })
      .then(response => response.json())
      .then(data => {
        setFormStatus('success');
      })
      .catch(error => {
        console.log(error);
        setFormStatus('idle');
      });
  };

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const services = [
    {
      title: 'Plumbing Services',
      icon: <Droplets className="w-12 h-12 text-brand-blue" />,
      description: 'Comprehensive plumbing solutions for residential and commercial properties.',
      features: [
        'General plumbing maintenance and repairs',
        'Drain cleaning and unblocking',
        'Burst pipe repairs',
        'Hot water systems installation and servicing',
        'Emergency plumbing solutions'
      ],
      color: 'hover:border-brand-blue'
    },
    {
      title: 'Electrical Services',
      icon: <Zap className="w-12 h-12 text-brand-blue" />,
      description: 'Certified electrical work ensuring safety and efficiency in every installation.',
      features: [
        'Electrical installations and upgrades',
        'Fault-finding and repairs',
        'Lighting and power solutions',
        'Compliance testing and inspections',
        'Energy-efficient solutions'
      ],
      color: 'hover:border-brand-blue'
    },
    {
      title: 'Building Services',
      icon: <Hammer className="w-12 h-12 text-brand-blue" />,
      description: 'Professional construction and remodeling services for your property.',
      features: [
        'Renovations and remodeling',
        'General construction and maintenance',
        'Waterproofing and damp-proofing',
        'Flooring, tiling, and painting'
      ],
      color: 'hover:border-brand-red'
    }
  ];

  const coreValues = [
    {
      name: 'Quality',
      icon: <Award className="w-10 h-10" />,
      desc: 'Delivering top-notch services every time.'
    },
    {
      name: 'Integrity',
      icon: <ShieldCheck className="w-10 h-10" />,
      desc: 'Upholding honesty and transparency in all our dealings.'
    },
    {
      name: 'Reliability',
      icon: <Clock className="w-10 h-10" />,
      desc: 'Being there when you need us most.'
    },
    {
      name: 'Innovation',
      icon: <Lightbulb className="w-10 h-10" />,
      desc: 'Utilizing the latest technologies and techniques.'
    },
    {
      name: 'Safety',
      icon: <HardHat className="w-10 h-10" />,
      desc: 'Prioritizing the safety of our team and clients.'
    }
  ];

  const serviceAreas = [
    'City Bowl', 'Atlantic Seaboard', 'Northern Suburbs', 'Southern Suburbs', 'South Peninsula', 'Cape Flats'
  ];

  const galleryImages = [
    { src: imgCeilingGeyser, alt: 'Ceiling Geyser Installation' },
    { src: imgKitchenFixture, alt: 'Professional Plumbing Finish' },
    { src: imgBurstPipe, alt: 'Burst Pipe Repair Service' },
    { src: imgHorizontalGeyser, alt: 'Compliant Geyser Installation With Vacuum Breakers' },
  ];

  return (
    <div className="min-h-screen selection:bg-brand-blue selection:text-white">
      {/* Header */}v
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 bg-white shadow-md py-3`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <Logo className="w-14 h-14 group-hover:scale-110 transition-transform duration-300" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight leading-none text-brand-blue">
                MAPS SOLUTIONS
              </span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mt-0.5">
                Driven by Excellence
              </span>
            </div>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex flex-row items-center gap-6">
            {navLinks.map((link, idx) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="font-bold text-sm uppercase tracking-widest transition-all hover:text-brand-red relative group text-brand-blue whitespace-nowrap"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-red transition-all group-hover:w-full" />
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-brand-blue text-white py-2.5 px-6 font-bold text-xs rounded-full shadow-brand-blue/40 whitespace-nowrap ml-4 transition-all hover:bg-blue-800"
            >
              Get a Quote
            </motion.a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg bg-slate-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="text-slate-900" />
            ) : (
              <Menu className="text-slate-900" />
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 w-full bg-white shadow-2xl overflow-hidden md:hidden"
            >
              <div className="p-8 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-xl font-black text-slate-800 flex justify-between items-center group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                    <ArrowRight className="w-5 h-5 text-brand-blue opacity-0 group-hover:opacity-100 transition-all" />
                  </a>
                ))}
                <a
                  href="#contact"
                  className="btn-primary w-full mt-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Request Quote
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient pt-20">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0 z-0">
          <img
            src={imgMainLine}
            alt="MAPS SOLUTIONS Team on site"
            className="w-full h-full object-cover mix-blend-overlay opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-blue/20 to-brand-blue/60" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center space-y-8 py-24 text-center"
            >
              <div className="inline-flex items-center gap-2 bg-brand-blue/10 backdrop-blur-md border border-brand-blue/20 text-brand-blue px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em]">
                <ShieldCheck className="w-4 h-4" />
                Licensed & Professional
              </div>

              <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">
                CAPE TOWN'S <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue-light to-white">PREMIER</span> <br />
                SOLUTIONS
              </h1>

              <p className="text-xl md:text-2xl text-blue-100/80 leading-normal max-w-3xl font-medium">
                Setting the industry standard for plumbing, electrical, and building services <span className="text-brand-blue-light font-bold">across the Greater Cape Town area.</span>
              </p>

              {/* Local Badge - Floated above buttons */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl">
                <div className="w-8 h-8 bg-brand-blue rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-black uppercase tracking-[0.2em] text-[10px]">
                  Proudly Cape Town Owned & Operated
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
                <a href="#contact" className="bg-brand-blue text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:bg-blue-800 hover:scale-[1.02] shadow-lg shadow-brand-blue/30 flex items-center justify-center gap-2 group w-full sm:w-auto">
                  Contact Us
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#services" className="btn-outline !border-white/30 !text-white hover:!bg-white hover:!text-brand-blue backdrop-blur-sm w-full sm:w-auto">
                  Explore Services
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding bg-blueprint relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-brand-blue font-black uppercase tracking-[0.4em] text-xs mb-4">Our Expertise</h2>
              <h3 className="text-5xl md:text-6xl font-black tracking-tighter">Cape Town's <br /><span className="text-gradient">Best Solutions</span></h3>
            </div>
            <p className="text-slate-500 text-lg max-w-md mb-2">
              We provide specialized services designed for high-performance environments and premium residential properties.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {services.map((service, idx) => (
              <FadeInWhenVisible key={service.title} delay={idx * 0.1}>
                <div className={`service-card group ${service.color}`}>
                  <div className="mb-10 p-5 bg-slate-50 rounded-2xl inline-block group-hover:bg-brand-blue group-hover:text-white transition-all duration-500 shadow-inner">
                    {React.cloneElement(service.icon as React.ReactElement<{ className?: string }>, { className: "w-12 h-12 transition-colors duration-500" })}
                  </div>
                  <h4 className="text-3xl font-black mb-6 tracking-tight">{service.title}</h4>
                  <p className="text-slate-600 mb-10 leading-relaxed font-medium">{service.description}</p>
                  <ul className="space-y-4 mb-10">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-4 text-slate-700 font-bold text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-4 border-2 border-slate-100 text-slate-400 font-black text-xs uppercase tracking-widest rounded-xl group-hover:border-brand-blue group-hover:text-brand-blue transition-all duration-300">
                    View Details
                  </button>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="section-padding bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-circuit opacity-20" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-brand-red font-black uppercase tracking-[0.4em] text-xs mb-4">Why Choose Us</h2>
            <h3 className="text-5xl md:text-6xl font-black tracking-tighter mb-8">The Gold Standard in <br />Maintenance</h3>
            <p className="text-slate-400 text-xl">
              We combine decades of experience with cutting-edge technology to deliver results that stand the test of time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-x-12 gap-y-20">
            {coreValues.map((value, idx) => (
              <FadeInWhenVisible key={value.name} delay={idx * 0.1}>
                <div className="flex flex-col items-center text-center group">
                  <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-brand-red group-hover:scale-110 transition-all duration-500 border border-white/10 shadow-2xl">
                    {React.cloneElement(value.icon as React.ReactElement<{ className?: string }>, { className: "w-10 h-10 text-brand-blue group-hover:text-white transition-colors" })}
                  </div>
                  <h4 className="text-2xl font-black mb-4 tracking-tight uppercase">{value.name}</h4>
                  <p className="text-slate-400 leading-relaxed font-medium">{value.desc}</p>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="portfolio" className="section-padding bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-brand-blue font-black uppercase tracking-[0.4em] text-xs mb-4">Our Portfolio</h2>
            <h3 className="text-5xl font-black tracking-tighter mb-6">Real Projects, <span className="text-gradient">Real Results</span></h3>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium">
              Take a look at some of our recent plumbing and maintenance work across Cape Town.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryImages.map((img, idx) => (
              <FadeInWhenVisible key={idx} delay={idx * 0.1}>
                <div className="group relative aspect-[3/4] overflow-hidden rounded-3xl shadow-xl">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                    <p className="text-white font-bold text-sm uppercase tracking-widest">{img.alt}</p>
                  </div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <FadeInWhenVisible>
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-blue/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-brand-red/10 rounded-full blur-3xl" />
                <img
                  src={imgUnderSink}
                  alt="MAPS SOLUTIONS Professional at work"
                  className="rounded-[2.5rem] shadow-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-12 -right-12 bg-brand-blue p-10 rounded-3xl shadow-2xl z-20 hidden md:block">
                  <div className="flex items-center gap-4 mb-2">
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    <span className="text-4xl font-black text-white">4.9/5</span>
                  </div>
                  <p className="text-blue-100 text-sm font-bold uppercase tracking-widest">Average Client Rating</p>
                </div>
              </div>
            </FadeInWhenVisible>

            <div>
              <h2 className="text-brand-blue font-black uppercase tracking-[0.4em] text-xs mb-4">Our Legacy</h2>
              <h3 className="text-5xl font-black tracking-tighter mb-10 leading-tight">Building Trust in <br />Cape Town Through <span className="text-gradient">Excellence</span></h3>

              <div className="space-y-10 mb-12">
                <p className="text-slate-600 text-lg leading-relaxed italic border-l-4 border-brand-blue pl-6 mb-8">
                  "As a Cape Town-based team, we understand the unique infrastructure and maintenance needs of our local community, from coastal waterproofing to suburban residential upgrades."
                </p>
                <div className="group">
                  <h4 className="text-xl font-black mb-4 flex items-center gap-4">
                    <span className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all">01</span>
                    Our Mission
                  </h4>
                  <p className="text-slate-600 text-lg leading-relaxed pl-14">
                    To provide high-quality plumbing, electrical, and building services that exceed customer expectations while promoting sustainable and safe practices.
                  </p>
                </div>

                <div className="group">
                  <h4 className="text-xl font-black mb-4 flex items-center gap-4">
                    <span className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all">02</span>
                    Our Vision
                  </h4>
                  <p className="text-slate-600 text-lg leading-relaxed pl-14">
                    To become a leading solutions provider in the construction and maintenance industry, recognized for excellence, innovation, and exceptional customer service.
                  </p>
                </div>
              </div>

              <button className="btn-primary">
                Learn More About Us
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Gen / Contact Section */}
      <section id="contact" className="section-padding bg-slate-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-start">
            <div>
              <h2 className="text-brand-red font-black uppercase tracking-[0.4em] text-xs mb-4">Contact</h2>
              <h3 className="text-5xl md:text-6xl font-black tracking-tighter mb-10">Ready to Start? <br />Let's Talk.</h3>
              <p className="text-slate-400 text-xl mb-16 leading-relaxed">
                Our enterprise solutions team is ready to discuss your requirements. From emergency repairs to long-term maintenance contracts.
              </p>

              <div className="grid sm:grid-cols-2 gap-10">
                <div className="space-y-8">
                  <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-brand-blue transition-all border border-white/10">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest mb-1">Call Us</p>
                      <p className="text-xl font-black">0616527539</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-brand-blue transition-all border border-white/10">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest mb-1">Email</p>
                      <p className="text-lg font-black break-all">mapsgroupsolutions@gmail.com</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-brand-blue transition-all border border-white/10">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest mb-1">Location</p>
                      <p className="text-xl font-bold">Cape Town, Western Cape</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <AnimatePresence mode="wait">
                {formStatus !== 'success' ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-[2.5rem] p-10 md:p-14 shadow-2xl text-slate-900 relative z-10"
                  >
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Full Name</label>
                            <input
                              required
                              name="name"
                              type="text"
                              placeholder="John Doe"
                              className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue transition-all font-bold"
                            />
                          </div>
                          <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Phone Number</label>
                            <input
                              required
                              name="phone"
                              type="tel"
                              placeholder="061 652 7539"
                              className={`w-full px-6 py-4 rounded-xl bg-slate-50 border focus:outline-none focus:ring-4 focus:ring-brand-blue/10 transition-all font-bold ${phoneError ? 'border-brand-red ring-brand-red/10' : 'border-slate-100 focus:border-brand-blue'}`}
                            />
                            {phoneError && <p className="text-[10px] text-brand-red font-bold uppercase tracking-wider">{phoneError}</p>}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Email Address</label>
                          <input
                            required
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue transition-all font-bold"
                          />
                        </div>

                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Message</label>
                          <textarea
                            name="message"
                            rows={4}
                            placeholder="How can we help you?"
                            className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue transition-all font-bold resize-none"
                          ></textarea>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={formStatus === 'submitting'}
                        className="btn-primary w-full shadow-brand-red/40"
                      >
                        {formStatus === 'idle' ? (
                          <>Send Message <ArrowRight className="w-5 h-5" /></>
                        ) : (
                          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        )}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-[2.5rem] p-20 shadow-2xl text-slate-900 text-center flex flex-col items-center justify-center min-h-[500px]"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                      className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-8"
                    >
                      <CheckCircle2 className="w-12 h-12" />
                    </motion.div>
                    <h4 className="text-4xl font-black mb-4 tracking-tight">Message Sent!</h4>
                    <p className="text-slate-500 font-medium mb-10 max-w-xs">
                      Thank you for reaching out. Our team will contact you within the next 2 hours.
                    </p>
                    <button
                      onClick={() => setFormStatus('idle')}
                      className="text-brand-blue font-black uppercase tracking-widest text-xs hover:text-brand-red transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white pt-32 pb-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-2">
              <div className="flex items-center gap-4 mb-8">
                <Logo className="w-16 h-16" />
                <div className="flex flex-col">
                  <span className="text-2xl font-black tracking-tighter">MAPS SOLUTIONS</span>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500">Driven by Excellence</span>
                </div>
              </div>
              <p className="text-slate-500 max-w-md mb-10 leading-relaxed font-medium">
                The preferred choice for professional construction and maintenance. Delivering excellence across Cape Town with a commitment to quality and safety.
              </p>
              <div className="flex gap-4">
                {[
                  { Icon: Facebook, url: "https://www.facebook.com/share/1XMQhb6cUs/" },
                  { Icon: Twitter, url: "https://twitter.com" },
                  { Icon: Instagram, url: "https://instagram.com" },
                  { Icon: Linkedin, url: "https://linkedin.com" }
                ].map(({ Icon, url }, i) => (
                  <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center hover:bg-brand-red transition-all border border-white/5">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h5 className="font-black uppercase tracking-[0.2em] text-[10px] text-slate-400 mb-8">Service Areas</h5>
              <ul className="grid grid-cols-1 gap-4 text-slate-500 font-bold text-sm">
                {serviceAreas.map(area => (
                  <li key={area} className="flex items-center gap-3">
                    <div className="w-1 h-1 rounded-full bg-brand-blue" />
                    {area}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-black uppercase tracking-[0.2em] text-[10px] text-slate-400 mb-8">Office</h5>
              <div className="space-y-6 text-slate-500 font-bold text-sm">
                <p className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-brand-blue shrink-0" />
                  Cape Town Central,<br />Western Cape, South Africa
                </p>
                <div className="w-full h-32 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&q=80&w=400"
                    alt="Cape Town Map"
                    className="w-full h-full object-cover opacity-30 grayscale"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-brand-red animate-bounce" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-600 text-[10px] font-black uppercase tracking-widest">
            <p>&copy; {new Date().getFullYear()} MAPS SOLUTIONS. All Rights Reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile Button */}
      <div className="fixed bottom-6 left-6 right-6 z-[60] md:hidden">
        <motion.a
          href="tel:0616527539"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="bg-brand-blue text-white py-4 px-6 rounded-2xl shadow-2xl flex items-center justify-center gap-3 font-black uppercase tracking-widest text-sm"
        >
          <PhoneCall className="w-5 h-5" />
          Call Us Now
        </motion.a>
      </div>
    </div>
  );
};

export default App;
