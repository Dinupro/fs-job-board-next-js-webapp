# Full-Stack Architecture Refactor

Currently, the job board handles all data, searching, filtering, and pagination entirely on the frontend (client-side) using static data. To follow industry best practices for a realistic full-stack application, we will refactor the architecture to separate the frontend from the backend logic.

## Proposed Architecture

We will implement a standard 3-tier architecture typical of modern Next.js applications:
1. **Data Access Layer (DAL)**: Helper functions that act as our "database" ORM.
2. **API Layer (Route Handlers)**: RESTful endpoints exposing the data.
3. **Frontend (Server & Client Components)**: UI that relies on backend processing.

### 1. Data Access Layer (`lib/jobs.ts`)
We will create a robust data service that simulates a database connection.
- `getJobs(params)`: Handles searching, filtering, and pagination on the backend. Returns the paginated jobs and total count.
- `getJobById(id)`: Fetches a single job.
- `getFilterOptions()`: Extracts unique locations, types, terms, and skills for the frontend dropdowns.

### 2. API Endpoints
We will expose realistic REST API endpoints so the application could theoretically support external clients or mobile apps.
- **[NEW]** `app/api/jobs/route.ts`: `GET` endpoint accepting query parameters for search, filters, `page`, and `limit`.
- **[NEW]** `app/api/jobs/[id]/route.ts`: `GET` endpoint for a single job.
- **[NEW]** `app/api/jobs/filters/route.ts`: `GET` endpoint for the filter options.

### 3. Frontend Refactor (Server-Side Rendering & URL State)
We will refactor the main jobs page to follow the ultimate Next.js App Router best practice: **Server Components + URL Search Params**. 
Instead of holding `useState` locally (which drops all filters if a user refreshes the page), the filters will be synced to the URL (e.g., `/jobs?location=Remote&type=Internship&page=2`).

#### [MODIFY] `app/jobs/page.tsx`
- Convert to a Server Component.
- Read `searchParams` directly from the URL.
- Call the `lib/jobs.ts` helper directly (bypassing the API route, which is the recommended Next.js pattern for Server Components) to fetch exactly the 5 jobs needed for the current page.

#### [MODIFY] `components/JobFilters.tsx`
- Refactor to act as a Client Component that manages form state and uses Next.js `useRouter` to push updates to the URL query string.

#### [MODIFY] `app/jobs/[id]/page.tsx`
- Update to use the new `getJobById` helper from `lib/jobs.ts` instead of importing the static array directly.

## User Review Required

> [!IMPORTANT]
> **State Management Switch**: Moving filters to the URL means that every time a user changes a filter, the URL will update (e.g., `/jobs?page=2`). This is amazing for UX because users can bookmark or share specific searches! However, it means we will need to add a slight "debounce" to the text search bar so it doesn't update the URL on every single keystroke. 
> 
> Please review this plan and let me know if you approve moving the state to the URL, or if you strictly prefer Client-Side fetching via `useEffect` calling the new API routes. Both are valid, but URL state + Server Components is the Next.js gold standard.
