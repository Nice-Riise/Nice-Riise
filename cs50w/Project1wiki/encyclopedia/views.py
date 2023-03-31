from django.shortcuts import render
import markdown2 as markdown
import random


from . import util


def convert_md_to_html(title):
    content = util.get_entry(title)
    markdowner = markdown.Markdown()
    if content == None:
        return None
    else:
        return markdowner.convert(content)


def index(request):
    entries = util.list_entries()
    css_file = util.get_entry("CSS")
    coffee = util.get_entry("coffee")
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })


def entry(request, title):
    html_content = convert_md_to_html(title)
    if html_content == None:
        return render(request, "encyclopedia/error.html", {
            "message": "This entry does not exist"
        })
    else:
        return render(request, "encyclopedia/entry.html", {
            "title": title, "content": html_content
        })

# the search function


def search(request):
    if request.method == "POST":
        entry_search = request.POST['q']
        html_content = convert_md_to_html(entry_search)

        if html_content is not None:
            return render(request, "encyclopedia/entry.html", {
                "title": entry_search,
                "content": html_content
            })
        else:
            allEntries = util.list_entries()

            recommendation = []

            for entry in allEntries:
                if entry_search.lower() in entry.lower():
                    recommendation.append(entry)

            return render(request, "encyclopedia/search.html", {
                "recommendation": recommendation
            })

    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })


# Make a new page and convvert "md"
def new_page(request):
    if request.method == "GET":

        return render(request, "encyclopedia/new_p.html")
    else:
        title = request.POST['title']
        content = request.POST['content']
        tilteExist = util.get_entry(title)

    if tilteExist is not None:
        return render(request, "encyclopedia/error.html", {
            "message": "Page already exists"
        })

    else:
        # Add title as a heading in the content
        content = f"# {title}\n\n{content}"
    util.save_entry(title, content)

    html_content = convert_md_to_html(title)

    return render(request, "encyclopedia/entry.html", {
        "title": title,
        "content": html_content
    })

# make the page editable


def edit_page(request):

    if request.method == 'POST':
        title = request.POST['entry_title']
        content = util.get_entry(title)

        return render(request, "encyclopedia/edit_page.html", {
            "title": title,
            "content": content
        })


# save the edited page and convert "md"

def save_edit(request):
    if request.method == "POST":
        title = request.POST['title']
        content = request.POST['content']

        # Add title as a heading in the content
        content = f"# {title}\n\n{content}"
        util.save_entry(title, content)

        html_content = convert_md_to_html(title)

        return render(request, "encyclopedia/entry.html", {
            "title": title,
            "content": html_content
        })


# Random page function


def random_page(request):

    allEntries = util.list_entries()
    rand_entry = random.choice(allEntries)
    html_content = convert_md_to_html(rand_entry)

    return render(request, "encyclopedia/entry.html", {
        "title": rand_entry,
        "content": html_content
    })
