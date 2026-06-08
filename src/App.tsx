import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { CaseStudiesPage } from './pages/CaseStudiesPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { TechnicalNotesPage } from './pages/TechnicalNotesPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="case-studies" element={<CaseStudiesPage />} />
        <Route path="technical-notes" element={<TechnicalNotesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
