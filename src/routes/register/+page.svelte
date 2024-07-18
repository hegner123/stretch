<script lang="ts">
	import { writable } from 'svelte/store';
	import Nav from '$lib/components/Nav.svelte';
	import Content from '$lib/components/Content.svelte';

	const emailError = writable<any>('');
	const passwordColor = writable<any>('');
	const passwordStrength = writable<any>('');
	const passwordWidth = writable<any>('');
	const showHelp = writable<boolean>(false);
	let email: HTMLInputElement;
	let password: HTMLInputElement;

	function handleFormSubmit(e: Event) {
		e.preventDefault();
		try {
			register(email.value, password.value);
		} catch (err) {
			console.error(err);
		}
	}

	async function register(email: string, password: string) {
		const url = 'http://localhost:4000/api/auth/register'; // URL of the server endpoint
		const data = { email, password };
		const strengthScore = checkPasswordStrength(data.password);
		const emailIsValid = validateEmail(email);
		if (strengthScore >= 5 && emailIsValid) {
			try {
				const res = await fetch(url, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json'
					},
					body: JSON.stringify(data)
				});

				const { response } = await res.json();

				if (response.status === 'FAILURE') {
					if (response.field === 'Email') {
						emailError.set(response.body[0]);
					}
				} else {
					logInAndRedirect(data);
				}
				// Handle success (e.g., redirect to another page or show a success message)
			} catch (error) {
				console.error('Error:', error);
				// Handle error (e.g., show an error message to the user)
			}
		} else if (strengthScore < 5 && emailIsValid) {
			showHelp.set(true);
		} else {
			showHelp.set(true);
			emailError.set('Email is not valid');
		}
	}
	async function logInAndRedirect(credintials: { email: string; password: string }) {
		const url = 'http://localhost:4000/api/auth/login';
		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify(credintials)
			});
			const result = await response.json();
			console.log(result);
			if (result.login) {
				sessionStorage.setItem('loggedIn', 'true');
				sessionStorage.setItem('user', JSON.stringify(result.user));
				window.location.href = '/dashboard';
			}
		} catch (err) {
			console.error(err);
		}
	}

	function checkPasswordStrength(e: any) {
		console.log(e.data);
		let data: string;

		// Define a regex pattern for printable characters
		const printableCharacters = /^[\w\s.,!?;:(){}[\]"'`~@#$%^&*<>\/\\|+=-]$/;

		// Get the key value
		const key = e.data;

		// Check if the key is a printable character
		if (printableCharacters.test(key)) {
			data = password.value;
		} else {
			data = password.value;
		}
		const criteria = [
			{ regex: /[a-z]/, message: 'Lowercase letter' },
			{ regex: /[A-Z]/, message: 'Uppercase letter' },
			{ regex: /[0-9]/, message: 'Digit' },
			{ regex: /[^A-Za-z0-9]/, message: 'Special character' },
			{ regex: /.{9,}/, message: 'Minimum length of 8 characters' }
		];

		let score = 0;
		const passedCriteria = criteria.filter((criterion) => criterion.regex.test(data));
		score = passedCriteria.length;

		switch (score) {
			case 5:
				passwordColor.set('green');
				passwordStrength.set('Strong');
				passwordWidth.set(getWidth(score, criteria.length));
				break;
			case 4:
				passwordColor.set('orange');
				passwordStrength.set('Medium');
				passwordWidth.set(getWidth(score, criteria.length));
				break;
			default:
				passwordColor.set('red');
				passwordStrength.set('Weak');
				passwordWidth.set(getWidth(score, criteria.length));
		}
		const missingCriteria = criteria.filter((criterion) => !criterion.regex.test(data));
		if (missingCriteria.length > 0) {
			passwordStrength.set(missingCriteria.map((c) => c.message));
		}
		return score;
	}
	function getWidth(score: number, criteria: number): string {
		if (score / criteria) {
			return (score / criteria) * 100 + '%';
		} else {
			return '0%';
		}
	}

	function validateEmail(email: string) {
		// Regular expression to validate email address
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	}
</script>

<Nav />
<Content columns={12}>
	<div class="register-container">
		<form>
			<h2>Register</h2>
			<div class="email-group">
				<input
					autocomplete="email"
					type="text"
					name="email"
					placeholder="Email"
					bind:this={email}
					required
				/>
				{#if $emailError !== ''}
					<span class="error-message email-error">{$emailError}</span>
				{/if}
			</div>
			<div class="password-group">
				<input
					autocomplete="current-password"
					type="password"
					name="password"
					placeholder="Password"
					bind:this={password}
					on:input={checkPasswordStrength}
					required
				/>
				<div class="strength-text" id="strength-text">
					{#if $passwordStrength.length > 0 && $showHelp}
						<ul class="error-message-list">
							{#if Array.isArray($passwordStrength)}
								{#each $passwordStrength as item}
									<li class="error-message">{item}</li>
								{/each}
							{:else}
								<span class="strength-message">{$passwordStrength}</span>
							{/if}
						</ul>
					{/if}
				</div>
				<div class="strength-meter">
					<div
						class="strength-meter-fill"
						id="strength-meter-fill"
						style="--fill-color:{$passwordColor};--fill-width:{$passwordWidth};"
					></div>
				</div>
			</div>
			<div class="btn-group">
				<button on:click={handleFormSubmit} class="btn">Register</button>
				<a class="btn" href="../">Cancel</a>
			</div>
		</form>
	</div>
</Content>

<style>
	.register-container {
		display: grid;
		max-width: 400px;
		grid-column: 2/5;
	}

	.register-container form {
		display: grid;
		grid-template-columns: 1fr;
		grid-auto-rows: max-content;
		gap: 1rem;
	}

	.register-container form input {
		font-size: 1rem;
		padding: 0.5rem;
		width: 100%;
	}

	.email-group {
		position: relative;
	}

	.error-message-list {
		position: absolute;
		top: 0;
		left: 390px;
		padding: 0;
		margin: 0;
		margin-block-start: 0;
	}
	.error-message {
		color: #ddaaaa;
		font-size: 0.75rem;
		display: block;
		width: max-content;
	}
	.strength-message {
		color: #aaddaa;
		font-size: 0.75rem;
		display: block;
		width: max-content;
	}

	.email-error {
		position: absolute;
		left: 390px;
		top: 0;
	}

	.password-group {
		position: relative;
		display: grid;
		grid-template-columns: 1fr;
		grid-auto-rows: min-content;
	}

	.strength-meter {
		width: 100%;
		height: 10px;
		grid-column: 1/-1;
		background-color: #ddd;
	}
	.strength-meter-fill {
		height: 100%;
		width: var(--fill-width);
		background-color: var(--fill-color);
		transition: width 0.3s;
	}

	.btn-group {
		display: flex;
		gap: 1rem;
		margin-top: 1rem;
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

	@media (min-width: 1024px) {
		.register-container {
			max-width: 400px;
			grid-column: 2/5;
			margin-left: unset;
			margin-right: unset;
		}
		.register-container form .password-group input {
			grid-column: 1/-1;
		}

		.password-group {
			grid-template-columns: 3fr 1fr;
		}
	}
</style>
