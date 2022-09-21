## Project status
This project is not finished. It was meant to build an application from scratch and see how far I would progress up to three weeks.

# Individual Project

This is my individual project created as final product during my traineeship software engineering at Sogyo. At the time my engineering experience was about four months. This project lasted for three weeks. Any unfinished business should not be finished, however, remarking unfinished features was part of the project in order to contemplate any further design choices. It is about a boardgame called Machine Strike. It contains a React front-end, and a Python back-end.

## Add your files

- [ ] [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
- [ ] [Add files using the command line](https://docs.gitlab.com/ee/gitlab-basics/add-file.html#add-a-file-using-the-command-line) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://git.sogyo.nl/dengelen/individual-project.git
git branch -M main
git push -uf origin main
```

## Integrate with your tools

- [ ] [Set up project integrations](https://git.sogyo.nl/dengelen/individual-project/-/settings/integrations)

## Collaborate with your team

- [ ] [Invite team members and collaborators](https://docs.gitlab.com/ee/user/project/members/)
- [ ] [Create a new merge request](https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html)
- [ ] [Automatically close issues from merge requests](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically)
- [ ] [Enable merge request approvals](https://docs.gitlab.com/ee/user/project/merge_requests/approvals/)
- [ ] [Automatically merge when pipeline succeeds](https://docs.gitlab.com/ee/user/project/merge_requests/merge_when_pipeline_succeeds.html)

## Test and Deploy

Use the built-in continuous integration in GitLab.

- [ ] [Get started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/quick_start/index.html)
- [ ] [Analyze your code for known vulnerabilities with Static Application Security Testing(SAST)](https://docs.gitlab.com/ee/user/application_security/sast/)
- [ ] [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/ee/topics/autodevops/requirements.html)
- [ ] [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/ee/user/clusters/agent/)
- [ ] [Set up protected environments](https://docs.gitlab.com/ee/ci/environments/protected_environments.html)

***

## Name
My own version of Machine Strike.

## Description
Machine Strike is an in-game side activity you can play in Horizon Forbidden West. More specifically, it is a turn-based 2-player board game. This repository contains the code trying to re-enact the original boardgame as it is seen in the actual game itself. In short, both players choose a set of board pieces with a maximum value of 10 points in total. Every piece is worth a particular amount of points, depending on the overall strength of the piece. For example, you can have five 2-points pieces or one 6-points piece together with a 4-points piece. When a piece is defeated, the opposing player acquires victorypoints, which are the points that piece is worth to begin with. The goal is to eliminate all strike pieces of your opponent or defeat enough of them to acquire at least 7 victorypoints. Every piece is a certain type and contains health, an attack value, an attack range, a movement range, armored spots, weak spots, and optionally an ability

My implementation is not finished yet. You can select players, choose a board, pick pieces and eventually start the game. While playing you can move the pieces, see beforehand their maximum movement range, and overload them (taking another turn once per piece per turn in exchange for some health). Afterwards, the active player will switch turns enabling the opposing player to the same. The pieces not belonging to the active player are blurred to indicate it s not that player's turn.

## Visuals
Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Roadmap
If you have ideas for releases in the future, it is a good idea to list them in the README.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## Project status
If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.
