import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { CaseStudyDetailPage } from './pages/CaseStudyDetailPage'
import { CaseStudiesPage } from './pages/CaseStudiesPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { TechnicalNotesPage } from './pages/TechnicalNotesPage'

const ResumePage = lazy(() => import('./pages/ResumePage'))

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="case-studies" element={<CaseStudiesPage />} />
        <Route
          path="case-studies/:caseStudyId"
          element={<CaseStudyDetailPage />}
        />
        <Route path="technical-notes" element={<TechnicalNotesPage />} />
        <Route
          path="resume"
          element={
            <Suspense
              fallback={
                <div className="mx-auto max-w-6xl px-5 py-16 text-zinc-600">
                  Loading resume...
                </div>
              }
            >
              <ResumePage />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
