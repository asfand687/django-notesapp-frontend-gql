import { gql, useMutation, useQuery } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

const NoteDetail = () => {
	const { id } = useParams()

	const [note, setNote] = useState({
		body: '',
	})

	const GET_NOTE = gql`
		query GetNote($id: ID!) {
			note(id: $id) {
				body
			}
		}
	`
	const { data, loading, error } = useQuery(GET_NOTE, {
		variables: { id },
	})

	const UPDATE_NOTE = gql`
		mutation UpdateNote($id: ID!, $body: String!) {
			updateNote(id: $id, body: $body) {
				note {
					body
				}
			}
		}
	`

	const [updateNote, { data: updateNoteData, error: updateNoteError }] =
		useMutation(UPDATE_NOTE)

	const update = () => {
		updateNote({
			variables: {
				id: id,
				body: note.body,
			},
		})
		window.location.href = 'http://localhost:3000'
	}

	useEffect(() => {
		setNote({
			body: data?.note?.body,
		})
	}, [])

	return (
		<div className='container mt-6' style={{ width: '660px' }}>
			<div className='card'>
				<header className='card-header'>
					<p className='card-header-title'>Update Note</p>
				</header>
				<div className='card-content'>
					<div>
						<div class='field'>
							<label class='label'>Note</label>
							<div class='control has-icons-left '>
								<input
									value={note?.body}
									onChange={({ target }) =>
										setNote({ ...note, body: target.value })
									}
									class='input is-info'
									type='text'
									placeholder='Enter the note body'
								/>
								<span class='icon is-small is-left'>
									<i class='fas fa-envelope'></i>
								</span>
							</div>
						</div>
						<div class='field is-grouped'>
							<div class='control'>
								<button onClick={update} className='button is-success mt-2'>
									Update
								</button>
							</div>
							<div class='control'>
								<Link to='/' className='button is-danger mt-2'>
									Cancel
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default NoteDetail
