<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import MobileNav from './MobileNav.svelte';

	export const loggedIn = writable(false);
	const dispatch = createEventDispatcher();
	const mobileMenuOpen = writable<boolean>(false);

	function handleSignOut() {
		try {
			sessionSignOut();
			sessionStorage.removeItem('loggedIn');
			sessionStorage.removeItem('user');
		} catch (err) {
			console.error(err);
		} finally {
			window.location.href = '/';
		}
	}

	async function sessionSignOut() {
		const url = 'http://localhost:4000/api/auth/signout';
		try {
			const response = await fetch(url, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ userId: '1' })
			});
			console.log(response);
		} catch (err) {
			console.error(err);
		} finally {
		}
	}

	function handleMobileToggle(e: CustomEvent) {
		const open = e.detail.$open;
		mobileMenuOpen.set(!open);
		dispatch('mobileToggle', { open });
	}

	onMount(() => {
		switch (sessionStorage.getItem('loggedIn')) {
			case 'true':
				loggedIn.set(true);
				break;
			default:
				loggedIn.set(false);
				break;
		}
	});
</script>

<nav class="primary-nav">
	<div class="logo">
		<a href="/">Stretch Timers</a>
	</div>
	{#if !$mobileMenuOpen}
		<div class="navigation">
			<ul class="links">
				{#if $loggedIn === false}
					<li class="menu-item">
						<a href="/login">Login</a>
					</li>
					<li class="menu-item">
						<a href="/register">Register</a>
					</li>
					<li class="menu-item">
						<a href="/demo">Demo</a>
					</li>
				{:else}
					<li class="menu-item">
						<a href="/dashboard">Dashboard</a>
					</li>

					<li class="menu-item">
						<a href="/account">Account</a>
					</li>
					<li class="menu-item">
						<button class="btn-as-link" on:click={handleSignOut}>Sign Out</button>
					</li>
				{/if}
			</ul>
		</div>
	{:else}
		<div class="mobile-nav navigation">
			<ul class="mobile-links">
				{#if $loggedIn === false}
					<li class="menu-item">
						<a href="/login">Login</a>
					</li>
					<li class="menu-item">
						<a href="/register">Register</a>
					</li>
					<li class="menu-item">
						<a href="/demo">Demo</a>
					</li>
				{:else}
					<li class="menu-item">
						<a href="/dashboard">Dashboard</a>
					</li>
					<li class="menu-item">
						<a href="/account">Account</a>
					</li>

					<li class="menu-item">
						<button class="btn-as-link" on:click={handleSignOut}>Sign Out</button>
					</li>
				{/if}
			</ul>
		</div>
	{/if}
	<div class="mobile-nav">
		<MobileNav on:mobileToggle={handleMobileToggle} />
	</div>
</nav>

<style>
	.primary-nav {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: var(--nav-height);
		position: relative;
	}
	.navigation {
		display: none;
	}
	.mobile-nav {
		display: block;
		z-index: 1;
		margin-right: 1rem;
	}

	.mobile-nav.navigation {
		position: absolute;
		top: 0;
		left: 0;
		margin: 0;
		background: #000;
		width: 100vw;
		padding-top: 6rem;
	}

	.mobile-links .menu-item {
		margin-top: 1rem;
		font-size: 1rem;
	}

	.logo {
		padding: 2rem;
	}
	.logo a {
		color: white;
		text-decoration: none;
	}

	/*Large Break Point */
	@media (min-width: 1024px) {
		.navigation {
			display: block;
		}
		.mobile-nav {
			display: none;
		}
	}
	.links {
		display: grid;
		padding: 1rem;
		grid-template-columns: repeat(3, max-content);
        place-items: center;
		gap: 1rem;
	}

	.menu-item {
		padding: 0;
		list-style: none;
        text-align: center;
	}
	.menu-item a,
	.btn-as-link {
		color: white;
		text-decoration: none;
		background: transparent;
		font-size: 1rem;
		border: none;
		cursor: pointer;
	}
</style>
