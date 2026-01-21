import { useState, useEffect } from 'react';

function App() {
  // --- STATE ---
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // --- DATA LOADING ---
  useEffect(() => {
    // Initial data loading using projects from Company Portfolio
    const initialData = [
      {
        id: 1,
        title: 'Invoice System',
        description: 'A comprehensive invoice management system with PDF generation, client management, and stock tracking.'
      },
      {
        id: 2,
        title: 'Clock App',
        description: 'A dynamic digital clock application built with React and styling inspired by glassmorphism.'
      },
      {
        id: 3,
        title: 'Personal Project Showcase',
        description: 'This application! A React-based showcase platform for displaying my portfolio projects.'
      }
    ];
    setProjects(initialData);
    console.log('Projects initialized with portfolio defaults');
  }, []);

  // --- HANDLERS ---
  const handleAddProject = (e) => {
    e.preventDefault();
    if (!title || !description) return;

    const projectToAdd = {
      id: Date.now(),
      title: title,
      description: description
    };

    setProjects([...projects, projectToAdd]);
    setTitle('');
    setDescription('');
    console.log('Project added to state:', projectToAdd);
  };

  // --- FILTERING ---
  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="title">Personal Project Showcase</h1>

      {/* Add Project Form Section */}
      <div className="section">
        <h2 style={{ marginTop: 0, fontSize: '1.25em', color: '#334155' }}>Add New Project</h2>
        <form onSubmit={handleAddProject}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter project title"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter project description"
            />
          </div>
          <button type="submit" className="btn">Add Project</button>
        </form>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search Projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Project List */}
      <div className="project-list-box">
        {filteredProjects.length > 0 ? (
          filteredProjects.map(project => (
            <div key={project.id} className="project-item">
              <div className="project-icon">{'</>'}</div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
            No projects found matching your search.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
