# Editing a previously deployed Evolution
Go to the cluster page.

![](https://imgur.com/LRZRkrJ.jpg)

Go to the service page.

![](https://imgur.com/iqPxg6q.jpg)

Click the Task Definition.

![](https://imgur.com/HeIxj8A.jpg)

Click container definition.

![](https://imgur.com/pz8pgiH.jpg)

Under environment variabels...

![](https://imgur.com/3SZFNwv.jpg)

Add this (`DATABASE_APPLY_DESTRUCTIVE_CHANGES`: `true):
![](https://imgur.com/P8H1KxR.jpg)

Back to the cluster page, click update service:
![](https://imgur.com/VBu6UgA.jpg)

And configure like so, selecting your new task definition and ticking "force new deployment":
![](https://imgur.com/oGCMenV.jpg)
