import { stat } from 'node:fs/promises';

import projectData from './_data/projects.json' assert { type: 'json' };

const pathExists = async (path) => {
  try {
    await stat(path);

    return path;
  } catch {}

  return null;
};

process.stdout.write(`## Hi! 👋 My name is Scott.

I'm a **game**, **web**, and **open source tool** developer.

I've released **150+ open source projects** on [GitHub](https://github.com/neogeek), I've won awards for 🏆 Best in VR and 🏆 Best of Accessibility at the 2020 [MIT Reality Hack](https://www.mitrealityhack.com), I run the [Purple Monkey Game Jam](https://purplemonkeygamejam.com/), given talks at [Boston Game Dev](https://www.meetup.com/bostongamedev/) meetups, and I just released my first game for mobile platforms called 🃏 [Flip Jacks](https://flipjacksgame.com).

${(
  await Promise.all(
    projectData.map(async (project) => {
      const imagePath = project.image
        ? await pathExists(project.image.src)
        : null;

      const videoPosterPath = project.video
        ? await pathExists(project.video.poster)
        : null;

      return `## [${project.name}](${project.url})

${project.description}

${
  imagePath
    ? `<img src="${imagePath}" width="400" />`
    : videoPosterPath
    ? `<img src="${videoPosterPath}" width="400" />`
    : ''
}

${project.links
  .map((link) =>
    link.url ? `- [${link.label}](${link.url})` : `- ${link.label}`
  )
  .join('\n')}
`;
    })
  )
).join('\n')}`);
