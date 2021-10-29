# Git Branching strategy

## frontend-admin directory and its dedicated git branch
- frontend-admin dir belongs to frontend-admin git branch, frontend-admin dir shouldn't have any access to any outside directories
or should not be aware of any directory outside its scope

## frontend-public directory and its dedicated git branch
- frontend-public dir belongs to frontend-public git branch, frontend-public dir shouldn't have any access to any outside directories
or should not be aware of any directory outside its scope

## backend directory and its dedicated git branch
- backend dir belongs to backend git branch, backend dir shouldn't have any access to any outside directories
or should not be aware of any directory outside its scope

## main branch directries
- config - main
- backend - main
- frontend-admin - frontend-admin(branch)
- frontend-public - frontend-public(branch)
- mediafiles - ignored*
- postgres - ignored*
- installed-plugins - ignored*