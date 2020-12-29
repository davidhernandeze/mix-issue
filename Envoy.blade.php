@servers(['production' => 'deployer@preview.coworg.com'])

@setup
    $repository = 'git@gitlab.com:cesar.chab/licit-action.git';
    $releases_dir = '/var/www/licit-action/releases';
    $app_dir = '/var/www/licit-action';
    $release = date('YmdHis');
    $new_release_dir = $releases_dir .'/'. $release;
@endsetup

@story('deploy')
    clone_repository
    run_composer
    update_symlinks
    npm_run_prod
@endstory

@task('clone_repository')
    echo 'Cloning repository'
    [ -d {{ $releases_dir }} ] || mkdir {{ $releases_dir }}
    git clone --depth 1 {{ $repository }} {{ $new_release_dir }}
    cd {{ $new_release_dir }}
    git reset --hard {{ $commit }}
@endtask

@task('run_composer')
    echo "Starting deployment ({{ $release }})"
    cd {{ $new_release_dir }}
    composer install --prefer-dist --no-scripts -q -o
    composer dump-autoload
@endtask

@task('update_symlinks')
    echo "Linking storage directory"
    rm -rf {{ $new_release_dir }}/storage
    ln -nfs {{ $app_dir }}/storage {{ $new_release_dir }}/storage

    echo 'Linking .env file'
    ln -nfs {{ $app_dir }}/.env {{ $new_release_dir }}/.env

    echo 'Linking current release'
    ln -nfs {{ $new_release_dir }} {{ $app_dir }}/current
@endtask

@task('npm_run_prod')

    cd {{ $new_release_dir }}
    echo "NPM run install"
    npm install --silent --no-progress > /dev/null
    echo "NPM run prod"
    npm run production --silent --no-progress > /dev/null

    echo "Deleting node_modules folder"
    rm -rf node_modules
@endtask
