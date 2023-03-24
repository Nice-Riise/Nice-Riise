import random
from django import forms
from django.shortcuts import redirect, render

from . import util

# Index Page


def entry(request, title):
    content = util.get_entry(title)

    if content is None:
        return render(request, "encyclopedia/error.html", {"message": "Not found."})
    else:
        return render(request, "encyclopedia/entry.html", {"title": title, "content": content})

# Search


def search(request):
    query = request.GET.get('q', '')
    entries = util.list_entries()

    if query in entries:
        return redirect('entry', title=query)
    else:
        results = [entry for entry in entries if query.lower()
                   in entry.lower()]
        return render(request, "encyclopedia/search_results.html", {"results": results})


class NewEntryForm(forms.Form):
    title = forms.CharField(label="Title")
    content = forms.CharField(widget=forms.Textarea, label="Content")

# New Page


def new_entry(request):
    if request.method == "POST":
        form = NewEntryForm(request.POST)
        if form.is_valid():
            title = form.cleaned_data["title"]
            content = form.cleaned_data["content"]

            if util.get_entry(title) is None:
                util.save_entry(title, content)
                return redirect('entry', title=title)
            else:
                return render(request, "encyclopedia/error.html", {"message": "Entry already exists."})
        else:
            return render(request, "encyclopedia/new_entry.html", {"form": form})

    return render(request, "encyclopedia/new_entry.html", {"form": NewEntryForm()})

# Edit Page


def edit_entry(request, title):
    if request.method == "POST":
        form = NewEntryForm(request.POST)
        if form.is_valid():
            content = form.cleaned_data["content"]
            util.save_entry(title, content)
            return redirect('entry', title=title)
        else:
            return render(request, "encyclopedia/edit_entry.html", {"form": form, "title": title})

    content = util.get_entry(title)
    form = NewEntryForm(initial={"title": title, "content": content})
    return render(request, "encyclopedia/edit_entry.html", {"form": form, "title": title})

# Random Page


def random_entry(request):
    entries = util.list_entries()
    random_title = random.choice(entries)
    return redirect('entry', title=random_title)
