document.addEventListener('DOMContentLoaded', () => {
  // Make community/account cards interactive with simple behaviour
  const community = document.querySelector('.card-community');
  const account = document.querySelector('.card-account');

  if (community) community.addEventListener('click', (e) => {
    // If the card includes an anchor, let it handle navigation; otherwise show a placeholder
    if (e.currentTarget.querySelector('a')) return;
    alert('Community features coming soon!');
  });
  if (account) account.addEventListener('click', (e) => {
    if (e.currentTarget.querySelector('a')) return;
    alert('Account management coming soon!');
  });
});
