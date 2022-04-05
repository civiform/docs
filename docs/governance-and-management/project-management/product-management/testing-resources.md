# Testing resources

### Testing resources

Product managers, user experience designers, and others may need to test out CiviForm to see how the product currently looks and works. Recall that there are 4 user types:

* Applicants
* Trusted intermediaries (TIs)
* CiviForm admins
* Program admins

Logging in as applicants, CiviForm admins, or Program admins is pretty easy -- there should be buttons for those directly on [staging.seattle.civiform.com](https://staging.seattle.civiform.com):

* Applicants: choose "Continue as guest"
* CiviForm admins: choose "Admin: Global"
* Program admins: choose "Admin: Of all programs"

However, logging in as a TI is harder. Here's how to get in as a TI:

1. Log in as a CiviForm admin ("Admin: Global").
2. Go to the Intermediaries tab.
3. Edit the "group name" intermediary group. (It's the only "Edit" button you'll see.)
4. Add `sherlock123@dispostable.com` as a member. You should see "OK" appear in the Status column.
5. Log out.
6. Log in (with the big "Log In" button) as a Trusted Intermediary. Use `sherlock` as the username and `221Bbaker!` (including the exclamation point) as the password.
7. You should be in! Look for a link to the Trusted Intermediary Dashboard.

If this Sherlock test account isn't found, you'll need to create a new IDCS account:

1. On the homepage, hit "Register" to make a new account.
2. Create a new throwaway email address on [dispostable.com](https://dispostable.com).
3. Fill in the form so you can create an account with that email address. Remember the username and password, and update this Wiki page accordingly.

[Check out this video to learn how to make a new account.](https://drive.google.com/file/d/1gb03zhlX7i6pBKdK3rVkwzWjGTraKGfT/view)
