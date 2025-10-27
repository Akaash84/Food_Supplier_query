document.addEventListener('DOMContentLoaded',()=>{
	const screens = {list:document.getElementById('screen-list'), raise:document.getElementById('screen-raise'), status:document.getElementById('screen-status')}
	const setActive = (key)=>{
		Object.values(screens).forEach(s=>s.classList.remove('active'))
		screens[key].classList.add('active')
		// update nav pressed state
		document.querySelectorAll('.nav-btn').forEach(b=>b.setAttribute('aria-pressed','false'))
		document.getElementById('nav-'+key).setAttribute('aria-pressed','true')
	}
	document.getElementById('nav-list').addEventListener('click',()=>setActive('list'))
	document.getElementById('nav-raise').addEventListener('click',()=>setActive('raise'))
	document.getElementById('nav-status').addEventListener('click',()=>setActive('status'))
	document.getElementById('btn-new').addEventListener('click',()=>setActive('raise'))
	// quick view buttons
	document.querySelectorAll('.view-queries').forEach(b=>{
		b.addEventListener('click',()=>setActive('status'))
	})

	// handle form submit (simulate API and navigate to status)
	const form = document.getElementById('raise-form')
	form.addEventListener('submit', e=>{
		e.preventDefault()
		const title = document.getElementById('field-title').value || 'New query'
		document.getElementById('status-title').textContent = title
		// set pill based on priority (simple rule)
		const pr = document.getElementById('field-priority').value
		const pill = document.getElementById('status-pill')
		pill.className = 'pill'
		if(pr === 'High') pill.classList.add('overdue'), pill.textContent='Overdue'
		else pill.classList.add('pending'), pill.textContent='Pending'
		// show progress bar sample
		document.querySelector('.sla-progress').style.width = (pr==='High'? '15%':'40%')
		// switch screen
		setActive('status')
		// announce (a11y)
		document.getElementById('status-summary').focus()
	})

	// mark resolved demo
	document.getElementById('mark-resolved').addEventListener('click',()=>{
		const pill = document.getElementById('status-pill')
		pill.className='pill resolved'
		pill.textContent='Resolved'
	})

	// keyboard accessible quick-focus
	document.getElementById('qsearch').addEventListener('keydown', (e)=>{
		if(e.key === 'Enter') e.preventDefault()
	})
})
