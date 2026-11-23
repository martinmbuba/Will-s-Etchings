import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Clock3,
  MapPin,
  Menu,
  Search,
  Star,
  UserRound,
  X,
} from 'lucide-react'

const designs = [
  { id: 1, title: 'Forest Deer', style: 'Black & Grey', artist: 'Dom Carter', price: 280, duration: '3–4 hours', image: '/real-tattoos/tattoo-01.jpg' },
  { id: 2, title: 'Lunar Wolf', style: 'Blackwork', artist: 'Mika Ren', price: 220, duration: '2–3 hours', image: '/real-tattoos/tattoo-02.jpg' },
  { id: 3, title: 'Shadow Wolf', style: 'Illustrative', artist: 'Soren Vale', price: 260, duration: '2–3 hours', image: '/real-tattoos/tattoo-03.jpg' },
  { id: 4, title: 'Ink Wolf', style: 'Black & Grey', artist: 'Alan Hindes', price: 320, duration: '4–5 hours', image: '/real-tattoos/tattoo-04.jpg' },
  { id: 5, title: 'Sloth Spirit', style: 'Neo Traditional', artist: 'Dom Carter', price: 250, duration: '2–3 hours', image: '/real-tattoos/tattoo-05.jpg' },
  { id: 6, title: 'Lion Mandala', style: 'Fine Line', artist: 'Dom Carter', price: 290, duration: '3–4 hours', image: '/real-tattoos/tattoo-06.jpg' },
  { id: 7, title: 'Lion and Cub', style: 'Illustrative', artist: 'Alan Hindes', price: 340, duration: '4–5 hours', image: '/real-tattoos/tattoo-07.jpg' },
  { id: 8, title: 'Noble Lion', style: 'Black & Grey', artist: 'Alan Hindes', price: 310, duration: '3–4 hours', image: '/real-tattoos/tattoo-08.jpg' },
  { id: 9, title: 'Bear Totem', style: 'Neo Traditional', artist: 'Dom Carter', price: 210, duration: '2–3 hours', image: '/real-tattoos/tattoo-09.jpg' },
  { id: 10, title: 'Orchid Tribal', style: 'Tribal', artist: 'Guest Artist', price: 195, duration: '1–2 hours', image: '/real-tattoos/tattoo-10.jpg' },
  { id: 11, title: 'Tribal Revival', style: 'Tribal', artist: 'Tattoo Collective', price: 300, duration: '3–4 hours', image: '/real-tattoos/tattoo-11.jpg' },
  { id: 12, title: 'Tribal Band', style: 'Tribal', artist: 'Studio Archive', price: 270, duration: '3–4 hours', image: '/real-tattoos/tattoo-12.jpg' },
  { id: 13, title: 'Dragon Backpiece', style: 'Japanese', artist: 'Mika Ren', price: 175, duration: '5–6 hours', image: '/real-tattoos/tattoo-13.jpg' },
  { id: 14, title: 'Eagle Backpiece', style: 'Illustrative', artist: 'Convention Artist', price: 310, duration: '5–6 hours', image: '/real-tattoos/tattoo-14.jpg' },
  { id: 15, title: 'London Owl', style: 'Fine Line', artist: 'Guest Artist', price: 230, duration: '2–3 hours', image: '/real-tattoos/tattoo-15.jpg' },
  { id: 16, title: 'Koi Study', style: 'Japanese', artist: 'Leila Moss', price: 350, duration: '4–5 hours', image: '/real-tattoos/tattoo-16.jpg' },
  { id: 17, title: 'Butterfly Blackwork', style: 'Blackwork', artist: 'Dom Carter', price: 240, duration: '2–3 hours', image: '/real-tattoos/tattoo-17.jpg' },
  { id: 18, title: 'Lion Mandala', style: 'Fine Line', artist: 'Dom Carter', price: 290, duration: '3–4 hours', image: '/real-tattoos/tattoo-18.jpg' },
  { id: 19, title: 'Tattooed Hand', style: 'Hand', artist: 'Convention Artist', price: 160, duration: '1–2 hours', image: '/real-tattoos/tattoo-19.jpg' },
  { id: 20, title: 'Snake Handpiece', style: 'Hand', artist: 'Brussels Collective', price: 190, duration: '2 hours', image: '/real-tattoos/tattoo-21.jpg' },
  { id: 21, title: 'Neck Script', style: 'Neck', artist: 'Guest Artist', price: 210, duration: '2 hours', image: '/real-tattoos/tattoo-22.jpg' },
  { id: 22, title: 'Barcode Neck', style: 'Neck', artist: 'Studio Archive', price: 180, duration: '1–2 hours', image: '/real-tattoos/tattoo-23.jpg' },
  { id: 23, title: 'Tribal Neck', style: 'Tribal', artist: 'Tribal Collective', price: 220, duration: '2–3 hours', image: '/real-tattoos/tattoo-24.jpg' },
  { id: 24, title: 'Evil Leg', style: 'Leg', artist: 'Convention Artist', price: 280, duration: '3–4 hours', image: '/real-tattoos/tattoo-25.jpg' },
  { id: 25, title: 'Leg Artwork', style: 'Leg', artist: 'Guest Artist', price: 260, duration: '3 hours', image: '/real-tattoos/tattoo-26.jpg' },
  { id: 26, title: 'Lower Back', style: 'Back', artist: 'Studio Archive', price: 240, duration: '2–3 hours', image: '/real-tattoos/tattoo-28.jpg' },
  { id: 27, title: 'Christian Backpiece', style: 'Back', artist: 'Mika Ren', price: 520, duration: '8–10 hours', image: '/real-tattoos/tattoo-29.jpg' },
  { id: 28, title: 'Full Back', style: 'Back', artist: 'Soren Vale', price: 480, duration: '8–10 hours', image: '/real-tattoos/tattoo-30.jpg' },
  { id: 29, title: 'Angel Sleeve', style: 'Sleeve', artist: 'Leila Moss', price: 430, duration: '6–8 hours', image: '/real-tattoos/tattoo-31.jpg' },
  { id: 30, title: 'Phoenix Sleeve', style: 'Sleeve', artist: 'Maaika', price: 460, duration: '7–9 hours', image: '/real-tattoos/tattoo-32.jpg' },
  { id: 31, title: 'Northern Sleeve', style: 'Sleeve', artist: 'Tattoo Belfast', price: 440, duration: '6–8 hours', image: '/real-tattoos/tattoo-33.jpg' },
  { id: 32, title: 'Pattern Study', style: 'Geometric', artist: 'Aya Linden', price: 170, duration: '1–2 hours', image: '/real-tattoos/tattoo-34.png' },
  { id: 33, title: 'Dom Geometric', style: 'Geometric', artist: 'Dom Carter', price: 290, duration: '3–4 hours', image: '/real-tattoos/tattoo-35.jpg' },
  { id: 34, title: 'Ornamental Art', style: 'Geometric', artist: 'Studio Archive', price: 200, duration: '2 hours', image: '/real-tattoos/tattoo-36.png' },
]

const categories = ['All designs', 'Fine Line', 'Blackwork', 'Japanese', 'Illustrative', 'Neo Traditional', 'Black & Grey', 'Tribal', 'Hand', 'Neck', 'Leg', 'Back', 'Sleeve', 'Geometric']

function App() {
  const [category, setCategory] = useState('All designs')
  const [query, setQuery] = useState('')
  const [selectedDesign, setSelectedDesign] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [bookingComplete, setBookingComplete] = useState(false)
  const [sortOrder, setSortOrder] = useState('featured')
  const [currentPage, setCurrentPage] = useState(1)
  const designsPerPage = 6
  const searchInputRef = useRef(null)

  const filteredDesigns = designs
    .filter((design) => {
      const matchesCategory = category === 'All designs' || design.style === category
      const matchesQuery = `${design.title} ${design.artist} ${design.style}`.toLowerCase().includes(query.toLowerCase())
      return matchesCategory && matchesQuery
    })
    .slice()
    .sort((first, second) => {
      if (sortOrder === 'price-low') return first.price - second.price
      if (sortOrder === 'price-high') return second.price - first.price
      if (sortOrder === 'name') return first.title.localeCompare(second.title)
      return first.id - second.id
    })

  const totalPages = Math.max(1, Math.ceil(filteredDesigns.length / designsPerPage))
  const visibleDesigns = filteredDesigns.slice(
    (currentPage - 1) * designsPerPage,
    currentPage * designsPerPage,
  )

  const openBooking = (design) => {
    setSelectedDesign(design)
    setBookingComplete(false)
  }

  const closeBooking = () => {
    setSelectedDesign(null)
    setBookingComplete(false)
  }

  const submitBooking = (event) => {
    event.preventDefault()
    setBookingComplete(true)
  }

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    if (selectedDesign) {
      const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
          closeBooking()
        }
      }

      window.addEventListener('keydown', handleKeyDown)
      return () => {
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [selectedDesign])

  return (
    <div className="site-shell">
      <header className="navbar">
        <a className="brand ceo-brand" href="#top" aria-label="Will's Etchings home">
          <span className="brand-mark">W</span>
          <span className="brand-copy">
            <span className="brand-name">WILL'S ETCHINGS</span>
            <span className="ceo-profile">
              <img src="/hero/william-bright.jpg" alt="William Bright, CEO" />
              <span>William Bright · CEO</span>
            </span>
          </span>
        </a>

        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
          <a href="#designs" onClick={() => setMenuOpen(false)}>Designs</a>
          <a href="#artists" onClick={() => setMenuOpen(false)}>Artists</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="#visit" onClick={() => setMenuOpen(false)}>Visit us</a>
        </nav>

        <div className="nav-actions">
          <button className="icon-button" aria-label="Search" onClick={() => {
            document.querySelector('#designs')?.scrollIntoView({ behavior: 'smooth' })
            setTimeout(() => searchInputRef.current?.focus(), 500)
          }}><Search size={19} /></button>
          <button className="icon-button account-button" aria-label="Account"><UserRound size={18} /></button>
          <button className="menu-button" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Curated tattoo art</p>
            <h1>Wear a story<br />worth <em>keeping.</em></h1>
            <p className="hero-description">Discover original designs by exceptional artists, then reserve your session in a few thoughtful steps.</p>
            <div className="hero-actions">
              <a className="primary-button" href="#designs">Explore designs <ArrowRight size={18} /></a>
              <a className="text-button" href="#process">How booking works</a>
            </div>
          </div>

          <div className="hero-art" aria-label="Featured tattoo artwork">
            <div className="hero-image-wrap">
              <img
                src="/hero/tattoo-hero.jpg"
                alt="Intricate black and grey shoulder and arm tattoo"
              />
            </div>
            <div className="hero-card">
              <div>
                <p>In the studio</p>
                <strong>From sketch to ink</strong>
              </div>
              <span>LIVE</span>
            </div>
            <span className="orbit-label">EST. 2018</span>
          </div>
        </section>

        <section className="trust-strip" id="artists">
          <div><strong>120+</strong><span>Original designs</span></div>
          <div><strong>18</strong><span>Resident artists</span></div>
          <div><strong>4.9</strong><span><Star size={13} fill="currentColor" /> Client rating</span></div>
          <div><strong>100%</strong><span>Hygiene certified</span></div>
        </section>

        <section className="design-section" id="designs">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span /> Find your piece</p>
              <h2>Explore the collection</h2>
            </div>
            <div className="search-box">
              <Search size={17} />
              <input
                ref={searchInputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  setCurrentPage(1)
                }}
                placeholder="Search designs or artists"
              />
            </div>
          </div>

          <div className="filter-row">
            <div className="filters" role="list" aria-label="Design categories">
              {categories.map((item) => (
                <button key={item} className={category === item ? 'filter active' : 'filter'} onClick={() => {
                  setCategory(item)
                  setCurrentPage(1)
                }}>{item}</button>
              ))}
            </div>
            <label className="sort-button">
              <span className="sr-only">Sort designs</span>
              <select
                value={sortOrder}
                onChange={(event) => {
                  setSortOrder(event.target.value)
                  setCurrentPage(1)
                }}
                aria-label="Sort designs"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="name">Name</option>
              </select>
              <ChevronDown size={16} />
            </label>
          </div>

          <div className="design-grid">
            {visibleDesigns.map((design) => (
              <article className="design-card" key={design.id}>
                <button className="design-image" onClick={() => openBooking(design)} aria-label={`Book ${design.title}`}>
                  <img src={design.image} alt={`${design.title} tattoo design`} />
                  <span className="style-tag">{design.style}</span>
                  <span className="view-design">View design <ArrowRight size={16} /></span>
                </button>
                <div className="design-info">
                  <div>
                    <h3>{design.title}</h3>
                    <p>by {design.artist}</p>
                  </div>
                  <strong>from ${design.price}</strong>
                </div>
              </article>
            ))}
          </div>

          {visibleDesigns.length === 0 && <div className="empty-state">No designs match your search.</div>}

          {filteredDesigns.length > 0 && (
            <nav className="pagination" aria-label="Design pages">
              <button
                className="page-arrow"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                ←
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  className={page === currentPage ? 'page-number active' : 'page-number'}
                  onClick={() => {
                    setCurrentPage(page)
                    document.querySelector('#designs')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  aria-current={page === currentPage ? 'page' : undefined}
                >
                  {page}
                </button>
              ))}
              <button
                className="page-arrow"
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                →
              </button>
            </nav>
          )}
        </section>

        <section className="process-section" id="process">
          <p className="eyebrow light"><span /> A considered process</p>
          <h2>From inspiration to ink.</h2>
          <div className="process-grid">
            <div><span>01</span><h3>Choose a design</h3><p>Browse original work and find the piece that speaks to you.</p></div>
            <div><span>02</span><h3>Reserve a session</h3><p>Select your artist, date, placement, and preferred size.</p></div>
            <div><span>03</span><h3>Confirm & prepare</h3><p>Complete your deposit and receive your consultation details.</p></div>
          </div>
        </section>

        <section className="visit-section" id="visit">
          <div>
            <p className="eyebrow"><span /> Visit the studio</p>
            <h2>Make it <em>personal.</em></h2>
          </div>
          <div className="visit-details">
            <p><MapPin size={18} /> 1601 West 6th Street, Austin, Texas 78703</p>
            <p><Clock3 size={18} /> Tue–Sat · 10:00–19:00</p>
          </div>
          <a className="outline-button" href="mailto:hello@willsetchings.studio">Get in touch <ArrowRight size={18} /></a>
        </section>
      </main>

      <footer>
        <a className="brand footer-brand" href="#top"><span className="brand-mark">W</span><span>WILL'S ETCHINGS</span></a>
        <p>Art that becomes part of you.</p>
        <span>© 2026 Will's Etchings · <a href="https://commons.wikimedia.org/" target="_blank" rel="noreferrer">Wikimedia Commons photos</a></span>
      </footer>

      {selectedDesign && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && closeBooking()}>
          <section className="booking-modal" role="dialog" aria-modal="true" aria-label={`Book ${selectedDesign.title}`}>
            <button className="modal-close" onClick={closeBooking} aria-label="Close"><X size={20} /></button>
            {!bookingComplete ? (
              <>
                <div className="booking-summary">
                  <img src={selectedDesign.image} alt="" />
                  <div>
                    <p>Selected design</p>
                    <h2>{selectedDesign.title}</h2>
                    <span>{selectedDesign.artist} · {selectedDesign.duration}</span>
                  </div>
                </div>
                <form onSubmit={submitBooking}>
                  <div className="form-row">
                    <label>Full name<input required placeholder="Your name" /></label>
                    <label>Email address<input required type="email" placeholder="you@example.com" /></label>
                  </div>
                  <div className="form-row">
                    <label>Preferred date<input required type="date" /></label>
                    <label>Placement<select required defaultValue=""><option value="" disabled>Select area</option><option>Forearm</option><option>Upper arm</option><option>Back</option><option>Chest</option><option>Leg</option><option>Other</option></select></label>
                  </div>
                  <label>Notes for the artist<textarea placeholder="Sizing, placement details, or anything we should know" rows="3" /></label>
                  <button className="primary-button booking-button" type="submit">Continue to deposit <ArrowRight size={18} /></button>
                </form>
              </>
            ) : (
              <div className="success-state">
                <div className="success-icon"><CalendarDays size={28} /></div>
                <p className="eyebrow"><span /> Request received</p>
                <h2>Your session request is ready.</h2>
                <p>We have reserved a priority request for <strong>{selectedDesign.title}</strong>. Secure deposit payments will be available once checkout is connected.</p>
                <button className="primary-button" onClick={closeBooking}>Done</button>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  )
}

export default App
