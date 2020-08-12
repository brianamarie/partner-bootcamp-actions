# Welcome partners

You will find some amazing hands-on activities for GitHub Actions in this repository.

During the course of these activities you will be using Actions to provision infrastructure, test code and deploy an application to a cloud provider!

We will be using Microsoft Azure as our cloud provider and our application will be build using the Probot JavaScript framework. All of our guides will be reflective of these technologies. You can accomplish all these tasks with a different cloud provider and different application if you so choose to do so, but be warned, you'll need to do some major refactoring of setup steps, code creation/testing and deployment steps!

Since this section of the bootcamp is about Actions, we have provided you with the source code for your Probot application.

However, we will need you to configure both the app on GitHub and your deployment environment on Azure. We will guide you though each task!

### Getting Azure up and running

1. To begin, make sure you head over to [Microsoft Azure](https://azure.microsoft.com/en-us/free/) and create a **FREE** account.

   > **If you are a Microsoft employee, the automated portion of these activities will not work with your Microsoft account. Please use a personal account to get the most out of this repo.**

2. Secondly, please install the [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest) on your local machine, you will use this for logging in and creating a service principle. We will guide you through both of these steps!

3. Lastly, please [create a new subscription](https://docs.microsoft.com/en-us/azure/cost-management-billing/manage/create-subscription) in the Azure portal.

   > **Your subscription must be configured "Pay as you go" which will require billing information. All activities will utilize a portion of your FREE plan. You should not be billed for anything you do in this repo as long as you follow the steps as we have them outlined.**

Now that you have an Azure account, subscription and the CLI tools let's get Probot setup correctly.

### Creating a Probot application

We are going to mimic a real world entitlements scenario. We want to allow our users to add themselves to the entitlements for specific resource simply by commenting `/add-me` in a GitHub issue.

We recognize that this isn't the safest of tasks in this form, so we don't recommend installing this Probot app in any repository that matters. We will however make a small change to the application and perform CI/CD with Actions to get that change into production. Once All the activities are done, we will remove this Probot app from production using Actions 🎉

> **Again, the source code will be provided.**

Let's get this application started.

1. [Create a new GitHub Appp](https://github.com/settings/apps/new) with:
   - **Homepage URL**: the URL to this GitHub repository
   - **Webhook URL**: Use `https://example.com` for now, we will change this once we deploy the application
   - **Webhook Secret**: Generate a unique secret with `openssl rand -base64 32` and save it, you will need it in the next activity!
1. Assign the following permission to the app:
   - Administration: **Read & write**
   - Metadata: **Read-only**
1. Subscribe to the following events:
   - Issue comment
   - Issues
   - Member
1. Download the **private key** from the app
1. Click the green **Install** button on the top left of the app page. You should play it safe and install this app on an empty dummy repository for now!

---

### Preparing this repository

The last thing to do is prepare this repository to keep track of a wide range of sensitive data, like your applications **Webhook Secret**.

<br>
<h5 align="center"> Navigate to the first issue in this repository for your next steps.</h5>
