import './App.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import jwt_decode from 'jwt-decode'
import {
	ApolloClient,
	InMemoryCache,
	gql,
	useMutation,
	useQuery,
} from '@apollo/client'

function App() {
	const [notes, setNotes] = useState([])
	const [newNote, setNewNote] = useState('')
	const [readMore, setReadMore] = useState(true)

	const ALL_NOTES = gql`
		query AllNotes {
			allNotes {
				id
				body
			}
		}
	`

	const CREATE_NOTE = gql`
		mutation CREATENOTE($body: String!) {
			createNote(body: $body) {
				note {
					body
				}
			}
		}
	`

	const DELETE_NOTE = gql`
		mutation DELETENOTE($id: ID!) {
			deleteNote(id: $id) {
				msg
			}
		}
	`
	const [deleteNote, { data: deleteNoteData, error: deleteNoteError }] =
		useMutation(DELETE_NOTE)

	const removeNote = (id) => {
		deleteNote({
			variables: {
				id,
			},
		})
		window.location.href = 'http://localhost:3000'
	}

	const [createNote, { data: noteData, error: noteError }] =
		useMutation(CREATE_NOTE)
	const addNote = () => {
		createNote({
			variables: {
				body: newNote,
			},
		})
		setNewNote('')
		window.location.href = 'http://localhost:3000'
	}

	const { loading, error, data, refetch } = useQuery(ALL_NOTES)

	

	useEffect(() => {}, [])
	return (
		<div className='App has-text-left'>
			<div className='container mt-6' style={{ width: '660px' }}>
				<div>
					<h2 className='title is-size-4'>Add Note</h2>
					<article className='field has-addons' style={{ width: '660px' }}>
						<div className='control'>
							<input
								value={newNote}
								onChange={({ target }) => setNewNote(target.value)}
								className='input'
								type='text'
								placeholder='Buy milk...'
								style={{ width: '600px' }}
							/>
						</div>
						<div className='control'>
							<button onClick={addNote} className='button is-primary'>
								Add
							</button>
						</div>
					</article>
				</div>
				<div className='mt-4'>
					<div>
						<h2 className='title is-size-4'>Notes</h2>
						<table className='table is-stripped is-bordered is-fullwidth'>
							<thead>
								<tr>
									<th>Note</th>
									<th style={{ width: '200px' }}>Created At</th>
									<th style={{ width: '100px' }}>Actions</th>
								</tr>
							</thead>
							<tbody>
								{data?.allNotes.map((note) => (
									<tr key={note.id}>
										<td>
											{readMore ? note.body.slice(0, 35) : note.body}
											{note.body.length > 35 && (
												<span
													style={{ cursor: 'pointer', color: 'blue' }}
													onClick={() => setReadMore(!readMore)}
												>
													{readMore ? ' ...readmore' : ' ...showless'}
												</span>
											)}
										</td>
										<td>{dayjs(note.created).format('DD MMMM YYYY')}</td>
										<td>
											<div className='is-flex is-justify-content-center'>
												<div
													className='mr-4'
													onClick={() => {
														removeNote(note.id)
													}}
													style={{ cursor: 'pointer' }}
												>
													<i className='fas fa-trash-alt'></i>
												</div>

												<Link className='' to={`/note/${note.id}`}>
													<i className='fas fa-edit'></i>
												</Link>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
