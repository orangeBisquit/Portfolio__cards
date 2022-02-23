const render = (container, child, place) => {
  child = child.getElement();

  switch (place) {
    case 'afterbegin':
      container.prepend(child);
      break;
    case 'beforeend':
      container.append(child);
      break;
  }
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

const sortProjectsNew = (projects) => {
  projects.sort((projectA, projectB) => projectA.age - projectB.age);
  return projects;
};

const sortProjectsOld = (projects) => {
  projects.sort((projectA, projectB) => projectB.age - projectA.age);
  return projects;
};

const getFilterValues = () => {
  const inputNodes = document.querySelectorAll('.filter__input:checked');
  const checkedValues = Array.from(inputNodes).map((item) => item.id);
  return checkedValues;
};

const filterChecker = (filters, tags) => filters.every((v) => tags.includes(v));

const filterProjects = (checked, projects) => {
  const filtered = projects.filter((project) => {
    if (filterChecker(checked, project.tags)) {
      return project;
    }
  });
  return filtered;
};

export { render, remove, sortProjectsNew, sortProjectsOld, getFilterValues, filterProjects};


