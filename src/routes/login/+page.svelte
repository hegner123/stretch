<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import Content from '$lib/components/Content.svelte';
	let email: HTMLInputElement;
	let password: HTMLInputElement;

	function handleFormSubmit(e: MouseEvent) {
		e.preventDefault();
		try {
			login(email?.value, password?.value);
		} catch (err) {
			console.error(err);
		}
	}

	async function login(email: string, password: string) {
		const url = 'http://localhost:4000/api/auth/login'; // URL of the server endpoint
		const data = { email, password };

		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify(data)
			});

			if (!response.ok) {
				throw new Error('Network response was not ok ' + response.statusText);
			}

			const result = await response.json();
			console.log('Success:', result);
			if (result.login) {
				loginSuccess(result.user);
			}
			// Handle success (e.g., redirect to another page or show a success message)
		} catch (error) {
			console.error('Error:', error);
			// Handle error (e.g., show an error message to the user)
		}
	}

	function loginSuccess(user: any) {
		const dbUpdate = new Event('dbUpdate');
		dispatchEvent(dbUpdate);
		sessionStorage.setItem('loggedIn', 'true');
		sessionStorage.setItem('user', JSON.stringify(user));
		window.location.href = '/dashboard';
	}
</script>

<Nav />
<Content columns={12}>
	<div class="login-container">
		<form>
			<h2>Login</h2>
			<input
				autocomplete="email"
				type="text"
				name="email"
				placeholder="Email"
				bind:this={email}
				required
			/>
			<input
				autocomplete="current-password"
				type="password"
				name="password"
				placeholder="Password"
				bind:this={password}
				required
			/>
			<div class="btn-group">
				<button class="btn" on:click={handleFormSubmit}>Login</button>
				<a href="../" class="btn">Cancel</a>
			</div>
			<a href="/forgot-password" class="forgot-password small">Forgot Password?</a>
		</form>
	</div>
</Content>

<style>
	.login-container {
		display: grid;
		max-width: 200px;
        margin-left:auto;
        margin-right:auto;
	}

	.login-container form {
		display: grid;
		grid-template-columns: 1fr;
		grid-auto-rows: 2.5rem;
		gap: 1rem;
	}
	.login-container form input {
		font-size: 1rem;
		padding: 0.5rem 1rem;
		width: 100%;
	}

	.btn-group {
		display: flex;
		gap: 1rem;
	}

	button.btn,
	a.btn {
		background: #f7f7f7;
		font-size: 1rem;
		width: fit-content;
		padding: 0.5rem 1rem;
		margin: 0;
		margin-block: 0;
		margin-inline: 0;
		border-radius: 15px;
		display: block;
		border: none;
		cursor: pointer;
		height: 2rem;
		color: black;
		text-decoration: none;
	}

	.forgot-password {
		color: white;
		font-size: 0.9rem;
	}

	@media (min-width: 1024px) {
		.login-container {
            max-width:400px;
			grid-column: 2/5;
            margin-left:unset;
            margin-right:unset;
		}
	}
</style>
